import { countSameIngredientInOrder } from './utils';

it('countSameIngredientInOrder() правильно принимает массив строк и возвращает массив массивов', () => {
	const ingredients = ['1', '2', '2', '3', '3', '3'];
	const result = countSameIngredientInOrder(ingredients);
	expect(result.length).toBe(3);
	expect(Array.isArray(result)).toBe(true);
	expect(result.map((array) => Array.isArray(array))).not.toContain(false);
	expect(result[0][1]).toBe(1);
	expect(result[1][1]).toBe(2);
	expect(result[2][1]).toBe(3);
});
