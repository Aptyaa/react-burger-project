import { BASE_URL, updateUser, updateToken, fetchUser } from './burgerApi';

describe('Api testing', () => {
	let fetchSpy: jest.Spied<typeof fetch>;
	beforeEach(() => {
		fetchSpy = jest.spyOn(global, 'fetch').mockResolvedValue({
			ok: true,
			json: () => {
				return {
					success: true,
					user: {
						name: 'test',
						email: 'test@mail.ru',
					},
				};
			},
		} as unknown as Response);
	});
	afterEach(() => {
		jest.resetAllMocks();
	});

	it('updateUser() should be success', async () => {
		const result = await updateUser({
			name: 'test',
			email: 'test@mail.ru',
			password: 'test123',
		});
		expect(result).toEqual({
			success: true,
			user: { name: 'test', email: 'test@mail.ru' },
		});
		expect(fetchSpy).toHaveBeenCalled();
		expect(fetchSpy).toHaveBeenCalledWith(`${BASE_URL}/auth/user`, {
			method: 'PATCH',
			headers: {
				'Content-type': 'application/json',
				Authorization: 'Bearer undefined',
			},
			body: JSON.stringify({
				name: 'test',
				email: 'test@mail.ru',
				password: 'test123',
			}),
		});
	});

	it('updateUser() should be failed ', async () => {
		fetchSpy.mockImplementationOnce(() =>
			Promise.resolve({
				ok: false,
				status: 500,
			} as unknown as Response)
		);
		await expect(
			updateUser({
				name: 'test',
				email: 'test@mail.ru',
				password: 'test123',
			})
		).rejects.toThrow('Ошибка: 500');
	});
	it('updateToken() should  successfully add token in localstorage & cookie', async () => {
		fetchSpy.mockResolvedValue({
			ok: true,
			json: () => ({
				accessToken: 'Bearer access',
				refreshToken: 'refresh',
			}),
		} as unknown as Response);
		await updateToken();
		expect(localStorage.getItem('refreshToken')).toBe('refresh');
		expect(document.cookie).toBe('accessToken=access');
	});
	it('updateToken() should be failed', async () => {
		fetchSpy.mockResolvedValue({
			ok: false,
			status: 404,
		} as unknown as Response);
		await expect(updateToken()).rejects.toThrow('Ошибка: 404');
	});
	it('fetchUser() should return correct data', async () => {
		fetchSpy.mockResolvedValue({
			ok: true,
			json: () => ({
				success: true,
				user: {
					email: 'test@mail.ru',
					name: 'test',
				},
			}),
		} as unknown as Response);
		const result = await fetchUser();
		expect(result).toEqual({
			success: true,
			user: { email: 'test@mail.ru', name: 'test' },
		});
	});
	it('fetchUser() should be failed', async () => {
		fetchSpy.mockResolvedValue({
			ok: false,
			status: 404,
		} as unknown as Response);
		await expect(fetchUser()).rejects.toThrow('Ошибка: 404');
	});
});
