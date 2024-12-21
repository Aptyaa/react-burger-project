import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
	FetchedIngredients,
	IOrderConfirmResponse,
	IOrderConfirmRequest,
	IngredientsProp,
	IRegisterRequest,
	IRegisterSuccessResponse,
	IFetchedUser,
	ILoginRequest,
	IForgotAndResetPasswordResponse,
	IForgotPasswordRequest,
	IResetPasswordRequest,
	IUpdateTokenSuccess,
	IUpdateTokenRequest,
	IUpdateUser,
	IOrdersResponse,
} from '../types';
import { extractJWTToken, getCookie } from './utils';
import {
	BASE_URL,
	updateToken,
	updateTokenAndFetchUser,
	updateTokenAndUpdateUser,
} from './burgerApi';

const WS_URL = 'wss://norma.nomoreparties.space/orders';

interface ITransformResponseIngredients {
	ingredients: {
		buns: IngredientsProp[];
		sauces: IngredientsProp[];
		main: IngredientsProp[];
	};
	data: IngredientsProp[];
	ingredientById: { [key: string]: IngredientsProp };
}

export const appApi = createApi({
	reducerPath: 'appApi',
	baseQuery: fetchBaseQuery({
		baseUrl: '/',
	}),
	keepUnusedDataFor: 3,
	tagTypes: ['User'],
	endpoints: (builder) => ({
		getOrderByNumber: builder.query<IOrdersResponse, number>({
			query: (arg: number) => `${BASE_URL}/orders/${arg}`,
		}),
		getPersonalOrderWs: builder.query<IOrdersResponse, void>({
			queryFn: () => ({
				data: {
					success: false,
					orders: [],
					total: 0,
					totalToday: 0,
					orderByNumber: {},
				},
			}),
			onCacheEntryAdded: async (_, { updateCachedData, cacheEntryRemoved }) => {
				let ws: WebSocket | null = null;
				let shouldReconnect = true;

				const connect = async () => {
					ws = new WebSocket(
						`${WS_URL}?token=${
							getCookie('accessToken') || (await updateToken())
						}`
					);

					ws.onmessage = async (event: MessageEvent) => {
						const data: IOrdersResponse = JSON.parse(event.data);
						if (!data.success)
							throw new Error('some problems during fetching data in WS');
						updateCachedData((draft) => {
							draft.success = data.success;
							draft.orders = [...data.orders].reverse();
							draft.total = data.total;
							draft.totalToday = data.totalToday;
							draft.orderByNumber = Object.fromEntries(
								data.orders.map((order) => [order.number, order]).reverse()
							);
						});
					};
					ws.onclose = () => {
						if (shouldReconnect) connect();
					};
				};

				try {
					connect();
				} catch (error) {
					console.error('Ошибка при подключении к вебсокету: ', error);
				}
				await cacheEntryRemoved;
				shouldReconnect = false;
				if (ws) (ws as WebSocket).close();
			},
		}),
		getOrdersWS: builder.query<IOrdersResponse, void>({
			queryFn: () => ({
				data: {
					success: false,
					orders: [],
					total: 0,
					totalToday: 0,
					orderByNumber: {},
				},
			}),
			async onCacheEntryAdded(_, { updateCachedData, cacheEntryRemoved }) {
				let shouldReconnect = true;
				let ws: WebSocket | null = null;

				const connect = async () => {
					ws = new WebSocket(`${WS_URL}/all`);

					ws.onmessage = (event: MessageEvent) => {
						const data: IOrdersResponse = JSON.parse(event.data);
						if (!data.success) return;

						updateCachedData((draft) => {
							draft.success = data.success;
							draft.orders = data.orders;
							draft.total = data.total;
							draft.totalToday = data.totalToday;
							draft.orderByNumber = Object.fromEntries(
								data.orders.map((order) => [order.number, order])
							);
						});
					};

					ws.onclose = () => {
						if (shouldReconnect) {
							setTimeout(connect, 2000);
						}
					};
				};

				try {
					connect();
				} catch (error) {
					console.error('Ошибка при подключении к вебсокету: ', error);
				}

				await cacheEntryRemoved;
				shouldReconnect = false;
				if (ws) (ws as WebSocket).close();
			},
		}),
		getIngredients: builder.query<ITransformResponseIngredients, void>({
			query: () => `${BASE_URL}/ingredients`,
			transformResponse: (response: FetchedIngredients) => {
				const buns: IngredientsProp[] = [];
				const sauces: IngredientsProp[] = [];
				const main: IngredientsProp[] = [];
				response.data.forEach((item) => {
					item.type === 'bun'
						? buns.push(item)
						: item.type === 'sauce'
						? sauces.push(item)
						: main.push(item);
				});
				const ingredientById = Object.fromEntries(
					response.data.map((ingredient) => [ingredient._id, ingredient])
				);
				return {
					ingredients: { buns, sauces, main },
					data: response.data,
					ingredientById,
				};
			},
		}),
		confirmOrder: builder.mutation<IOrderConfirmResponse, IOrderConfirmRequest>(
			{
				query: (ingredients) => ({
					url: `${BASE_URL}/orders`,
					method: 'POST',
					headers: [['Authorization', `Bearer ${getCookie('accessToken')}`]],
					body: {
						ingredients,
					},
				}),
			}
		),
		register: builder.mutation<IRegisterSuccessResponse, IRegisterRequest>({
			query: (body) => ({
				url: `${BASE_URL}/auth/register`,
				method: 'POST',
				body,
			}),
			transformResponse: (data: IRegisterSuccessResponse) => {
				localStorage.setItem('refreshToken', data.refreshToken);
				document.cookie = `accessToken=${extractJWTToken(
					data.accessToken
				)}; max-age=1200`;
				return data;
			},
		}),
		login: builder.mutation<IRegisterSuccessResponse, ILoginRequest>({
			query: (body) => ({
				url: `${BASE_URL}/auth/login`,
				method: 'POST',
				body,
			}),
			transformResponse: (data: IRegisterSuccessResponse) => {
				localStorage.setItem('refreshToken', data.refreshToken);
				document.cookie = `accessToken=${extractJWTToken(
					data.accessToken
				)}; max-age=1200`;
				return data;
			},
		}),
		logout: builder.mutation<IForgotAndResetPasswordResponse, void>({
			query: () => ({
				url: `${BASE_URL}/auth/logout`,
				method: 'POST',
				body: { token: localStorage.getItem('refreshToken') },
			}),
			transformResponse: (data: IForgotAndResetPasswordResponse) => {
				localStorage.removeItem('refreshToken');
				document.cookie = 'accessToken=undefined; max-age=-1';
				return data;
			},
		}),
		getUser: builder.query<IFetchedUser, void>({
			queryFn: async () => {
				try {
					const data = await updateTokenAndFetchUser();
					return { data };
				} catch (error) {
					return {
						error: {
							status: 500,
							statusText: (error as Error).cause,
							data: (error as Error).message,
						},
					};
				}
			},
			providesTags: ['User'],
		}),
		updateUser: builder.mutation<IFetchedUser, IUpdateUser>({
			queryFn: async (data: IUpdateUser) => {
				try {
					const result = await updateTokenAndUpdateUser(data);
					return { data: result };
				} catch (error) {
					return {
						error: {
							status: 500,
							statusText: (error as Error).cause,
							data: (error as Error).message,
						},
					};
				}
			},
			invalidatesTags: ['User'],
		}),
		forgotPassword: builder.mutation<
			IForgotAndResetPasswordResponse,
			IForgotPasswordRequest
		>({
			query: (body) => ({
				url: `${BASE_URL}/password-reset`,
				method: 'POST',
				body,
			}),
		}),
		resetPassword: builder.mutation<
			IForgotAndResetPasswordResponse,
			IResetPasswordRequest
		>({
			query: (body) => ({
				url: `${BASE_URL}/password-reset/reset`,
				method: 'POST',
				body,
			}),
		}),
		updateToken: builder.mutation<void, IUpdateTokenRequest>({
			query: () => ({
				url: `${BASE_URL}/auth/token`,
				method: 'POST',
				body: localStorage.getItem('refreshToken'),
			}),
			transformResponse: (response: IUpdateTokenSuccess) => {
				localStorage.setItem('refreshToken', response.refreshToken);
				document.cookie = `accessToken=${extractJWTToken(
					response.accessToken
				)}; max-age=1200`;
			},
		}),
	}),
});

export const {
	useGetIngredientsQuery,
	useConfirmOrderMutation,
	useRegisterMutation,
	useGetUserQuery,
	useUpdateUserMutation,
	useForgotPasswordMutation,
	useResetPasswordMutation,
	useLoginMutation,
	useLogoutMutation,
	useGetOrdersWSQuery,
	useGetOrderByNumberQuery,
	useGetPersonalOrderWsQuery,
} = appApi;
