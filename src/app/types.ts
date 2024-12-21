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

export interface IDragItemConstructor {
	index: number;
}
export interface IDropItemIngredient {
	id: string;
}

export interface IDragCollectedProps {
	isDragging: boolean;
}

export interface IUser {
	email: string | null;
	name: string | null;
}

export interface IRegisterRequest {
	email: string;
	name: string;
	password: string;
}

export interface ILoginRequest {
	email: string;
	password: string;
}

export interface IRegisterSuccessResponse {
	success: boolean;
	accessToken: string;
	refreshToken: string;
	user: IUser;
}

export interface IFetchedUser {
	success: boolean;
	user: IUser;
}

export interface IForgotPasswordRequest {
	email: string;
}

export interface IForgotAndResetPasswordResponse {
	success: boolean;
	message: string;
}

export interface IResponseError {
	success: false;
	message: string;
}

export interface IResetPasswordRequest {
	password: string;
	token: string;
}

export interface IUpdateTokenRequest {
	token: string;
}

export interface IUpdateTokenSuccess {
	success: true;
	accessToken: string;
	refreshToken: string;
}

export interface IUpdateUser {
	name: string;
	email: string;
	password: string;
}

export interface IOrder {
	ingredients: string[];
	_id: string;
	status: string;
	number: number;
	createdAt: string;
	updatedAt: string;
	name: string;
}

export interface IOrdersResponse {
	success: boolean;
	orders: IOrder[];
	total: number;
	totalToday: number;
	orderByNumber: { [key: string]: IOrder };
}

export const isOrdersGuard = (data: unknown): data is IOrdersResponse => {
	return data !== null && (data as IOrdersResponse).success !== undefined;
};
