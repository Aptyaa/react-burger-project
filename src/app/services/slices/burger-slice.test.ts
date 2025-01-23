import {
	addIngredient,
	deleteIngredient,
	moveIngredient,
	resetBurger,
	IngredientsPropWithKey,
	reducer as burgerReducer,
	IBurger,
	initialState,
} from './burger-slice';

describe('Redux and actions testing', () => {
	const fakeBun = {
		type: 'bun',
		price: 10,
		_id: '1',
		key: 'bunKey',
	} as IngredientsPropWithKey;
	const fakeSauce = {
		type: 'sauce',
		price: 5,
		_id: '2',
		key: 'sauceKey',
	} as IngredientsPropWithKey;
	const fakeMain = {
		type: 'main',
		price: 30,
		_id: '3',
		key: 'mainKey',
	} as IngredientsPropWithKey;

	it('возвращает начальное состояние', () => {
		expect(burgerReducer(undefined, { type: '' })).toEqual(initialState);
	});

	it('addIngredient() корректно добавляет булки в бургер', () => {
		expect(
			burgerReducer(undefined, { type: addIngredient.type, payload: fakeBun })
		).toEqual({
			...initialState,
			ingredients: { ...initialState.ingredients, bun: [fakeBun, fakeBun] },
			toOrder: { ...initialState.toOrder, bun: [fakeBun._id] },
			totalPrice: initialState.totalPrice + fakeBun.price * 2,
		});
	});
	it('addIngredient() корректно добавляет ингредиент в бургер', () => {
		expect(
			burgerReducer(undefined, { type: addIngredient.type, payload: fakeMain })
		).toEqual({
			...initialState,
			ingredients: {
				...initialState.ingredients,
				saucesAndMain: [fakeMain],
			},
			toOrder: { ...initialState.toOrder, ingredients: [fakeMain._id] },
			totalPrice: initialState.totalPrice + fakeMain.price,
		});
	});

	it('moveIngredient() корректно меняет местами ингредиенты', () => {
		const fakeDragPayload = {
			draggedIndex: 0,
			targetIndex: 1,
		};
		const fakeInitialState = {
			...initialState,
			ingredients: {
				saucesAndMain: [fakeMain, fakeSauce],
			},
		} as IBurger;
		burgerReducer(fakeInitialState, {
			type: moveIngredient.type,
			payload: fakeDragPayload,
		});
		expect(
			burgerReducer(fakeInitialState, {
				type: moveIngredient.type,
				payload: fakeDragPayload,
			}).ingredients.saucesAndMain.findIndex((ing) => ing._id === fakeMain._id)
		).toBe(fakeDragPayload.targetIndex);
	});
	it('moveIngredient() выкидывает ошибку при не корректных индексах', () => {
		const fakeDragPayload = {
			draggedIndex: 0,
			targetIndex: 1,
		};
		expect(() =>
			burgerReducer(undefined, {
				type: moveIngredient.type,
				payload: fakeDragPayload,
			})
		).toThrow('Не допустимые draggedIndex или targetIndex');
	});

	it('deleteIngredient() корректно удаляет булку', () => {
		const fakeInitialState = {
			...initialState,
			ingredients: {
				...initialState.ingredients,
				bun: [fakeBun, fakeBun],
			},
			toOrder: {
				...initialState.toOrder,
				bun: [fakeBun._id],
			},
			totalPrice: initialState.totalPrice + fakeBun.price * 2,
		} as IBurger;
		expect(
			burgerReducer(fakeInitialState, {
				type: deleteIngredient.type,
				payload: fakeBun,
			})
		).toEqual(initialState);
	});
	it('deleteIngredient() корректно удаляет ингредиент', () => {
		const fakeInitialState = {
			...initialState,
			ingredients: {
				...initialState.ingredients,
				saucesAndMain: [fakeMain, fakeSauce],
			},
			toOrder: {
				...initialState.toOrder,
				ingredients: [fakeMain._id, fakeSauce._id],
			},
			totalPrice: initialState.totalPrice + fakeMain.price + fakeSauce.price,
		} as IBurger;
		const state = burgerReducer(fakeInitialState, {
			type: deleteIngredient.type,
			payload: fakeSauce,
		});
		expect(state.ingredients).toEqual({ bun: [], saucesAndMain: [fakeMain] });
		expect(state.totalPrice).toBe(
			fakeInitialState.totalPrice - fakeSauce.price
		);
		expect(state.toOrder.ingredients).toEqual([fakeMain._id]);
		expect(
			burgerReducer(state, { type: deleteIngredient.type, payload: fakeMain })
		).toEqual(initialState);
	});

	it('resetBurger() корректно очищает состояние', () => {
		const fakeInitialState = {
			...initialState,
			ingredients: {
				...initialState.ingredients,
				saucesAndMain: [fakeMain, fakeSauce],
			},
			toOrder: {
				...initialState.toOrder,
				ingredients: [fakeMain._id, fakeSauce._id],
			},
			totalPrice: initialState.totalPrice + fakeMain.price + fakeSauce.price,
		} as IBurger;
		expect(burgerReducer(fakeInitialState, { type: resetBurger.type })).toEqual(
			initialState
		);
	});
});
