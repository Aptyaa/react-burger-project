import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

export interface IngredientsProp {
	_id: string;
	name: string;
	type: string;
	proteins: number;
	fat: number;
	carbohydrates: number;
	calories: number;
	price: number;
	image: string;
	image_mobile: string;
	image_large: string;
	__v: number;
}

export interface FetchedIngredients {
	success: boolean;
	data: IngredientsProp[];
}

export type IOrderConfirmRequest = string[];
export interface IOrderConfirmResponse {
	name: string;
	order: {
		number: number;
	};
	success: boolean;
}

export const isFetchBaseQueryErrorType = (
	error: unknown
): error is FetchBaseQueryError =>
	(error as FetchBaseQueryError).status !== undefined;

export interface IDropItemConstructor {
	index: number;
}
export interface IDropItemIngredient {
	id: string;
}
