import {
	IngredientsProp,
	IResponseError,
	isFetchBaseQueryErrorType,
	isSerializeError,
} from '../types';

export const extractJWTToken = (str: string): string | null => {
	if (str.startsWith('Bearer ')) return str.split(' ')[1];
	return null;
};

export function getCookie(name: string): string | undefined {
	const matches = document.cookie.match(
		new RegExp(
			'(?:^|; )' +
				name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') +
				'=([^;]*)'
		)
	);
	return matches ? decodeURIComponent(matches[1]) : undefined;
}

export function takeIngredientsAndReturnPrice(
	listOfIngredients: ReadonlyArray<IngredientsProp> = []
): (args: string[]) => number {
	let totalCost = 0;
	const price = Object.fromEntries(
		listOfIngredients.map((ingredient) => [ingredient._id, ingredient.price])
	);
	return function (order: string[]) {
		order.map((id) => {
			totalCost += price[id];
		});
		return totalCost;
	};
}

export function fromArrayToObject<T extends { _id: unknown }>(
	data: T[] = []
): { [key: string]: T } {
	return Object.fromEntries(data.map((d) => [d._id, d]));
}

export function countSameIngredientInOrder(
	ingredients: string[] = []
): [string, number][] {
	return Object.entries(
		ingredients.reduce((acc, current) => {
			return acc[current] === undefined
				? { ...acc, [current]: 1 }
				: { ...acc, [current]: acc[current] + 1 };
		}, {} as { [key: string]: number })
	);
}

export function translateStatus(status: string): string {
	return status === 'created'
		? 'Создан'
		: status === 'done'
		? 'Выполнен'
		: 'Готовится';
}

export function getMessageError(error: unknown): string {
	console.log(error);
	if (isFetchBaseQueryErrorType(error)) {
		return (error.data as IResponseError).message;
	}

	if (isSerializeError(error))
		return error.message || 'Ошибка на стороне клиента';
	return 'Неизвестная ошибка';
}
