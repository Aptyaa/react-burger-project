import { IFetchedUser, IUpdateUser } from '../types';
import { extractJWTToken, getCookie } from './utils';

export const BASE_URL = 'https://norma.nomoreparties.space/api';

export const updateToken = async (): Promise<string | undefined> => {
	try {
		const response = await fetch(`${BASE_URL}/auth/token`, {
			method: 'POST',
			headers: {
				'Content-type': 'application/json',
			},
			body: JSON.stringify({
				token: localStorage.getItem('refreshToken'),
			}),
		});
		if (!response.ok) {
			throw new Error('Failed update token');
		}
		const data = await response.json();
		localStorage.setItem('refreshToken', data.refreshToken);
		document.cookie = `accessToken=${extractJWTToken(
			data.accessToken
		)}; max-age=1200`;
	} catch (error) {
		throw new Error((error as Error).message);
	}
	return getCookie('accessToken');
};

export const fetchUser = async (): Promise<IFetchedUser> => {
	try {
		const response = await fetch(`${BASE_URL}/auth/user`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${getCookie('accessToken')}`,
			},
		});
		if (!response.ok) {
			throw Error('Failed to fetch user');
		}
		const data = (await response.json()) as IFetchedUser;
		return data;
	} catch (error) {
		throw new Error((error as Error).message);
	}
};
export const updateUser = async (data: IUpdateUser): Promise<IFetchedUser> => {
	try {
		const response = await fetch(`${BASE_URL}/auth/user`, {
			method: 'PATCH',
			headers: {
				'Content-type': 'application/json',
				Authorization: `Bearer ${getCookie('accessToken')}`,
			},
			body: JSON.stringify({ ...data }),
		});
		if (!response.ok) throw new Error('Failed update user');
		const result = (await response.json()) as IFetchedUser;
		return result;
	} catch (error) {
		throw new Error((error as Error).message);
	}
};

export const updateTokenAndUpdateUser = async (
	data: IUpdateUser
): Promise<IFetchedUser> => {
	if (getCookie('accessToken')) {
		return await updateUser(data);
	}
	if (!getCookie('accessToken') && localStorage.getItem('refreshToken')) {
		await updateToken();
		return await updateUser(data);
	}
	throw new Error('No access token and no refresh token available');
};

export const updateTokenAndFetchUser = async (): Promise<IFetchedUser> => {
	if (getCookie('accessToken')) {
		return await fetchUser();
	}
	if (!getCookie('accessToken') && localStorage.getItem('refreshToken')) {
		await updateToken();
		return await fetchUser();
	}
	throw new Error('No access token and no refresh token available');
};
