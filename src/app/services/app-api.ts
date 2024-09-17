import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
	FetchedIngredients,
	IOrderConfirmResponse,
	IOrderConfirmRequest,
	IngredientsProp,
} from '../types';

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
		baseUrl: 'https://norma.nomoreparties.space/api/',
	}),
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
					body: {
						ingredients,
					},
				}),
			}
		),
	}),
});

export const { useGetIngredientsQuery, useConfirmOrderMutation } = appApi;
