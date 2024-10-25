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
} from '../types';
import { extractJWTToken, getCookie } from './utils';
import {
	BASE_URL,
	updateTokenAndFetchUser,
	updateTokenAndUpdateUser,
} from './burgerApi';

interface ITransformResponseIngredients {
	ingredients: {
		buns: IngredientsProp[];
		sauces: IngredientsProp[];
		main: IngredientsProp[];
	};
	data: IngredientsProp[];
}

export const appApi = createApi({
	reducerPath: 'appApi',
	baseQuery: fetchBaseQuery({
		baseUrl: BASE_URL,
	}),
	tagTypes: ['User'],
	endpoints: (builder) => ({
		getIngredients: builder.query<ITransformResponseIngredients, void>({
			query: () => '/ingredients',
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
				return {
					ingredients: { buns, sauces, main },
					data: response.data,
				};
			},
		}),
		confirmOrder: builder.mutation<IOrderConfirmResponse, IOrderConfirmRequest>(
			{
				query: (ingredients) => ({
					url: '/orders',
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
				url: 'auth/register',
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
				url: 'auth/login',
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
				url: 'auth/logout',
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
				url: 'password-reset',
				method: 'POST',
				body,
			}),
		}),
		resetPassword: builder.mutation<
			IForgotAndResetPasswordResponse,
			IResetPasswordRequest
		>({
			query: (body) => ({
				url: 'password-reset/reset',
				method: 'POST',
				body,
			}),
		}),
		updateToken: builder.mutation<void, IUpdateTokenRequest>({
			query: () => ({
				url: 'auth/token',
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
} = appApi;
