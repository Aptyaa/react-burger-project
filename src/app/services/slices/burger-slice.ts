import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';
import { IngredientsProp } from '../../types';

export interface IngredientsPropWithKey extends IngredientsProp {
	key: string;
}

export interface IBurger {
	ingredients: {
		bun: IngredientsPropWithKey[];
		saucesAndMain: IngredientsPropWithKey[];
	};
	toOrder: {
		bun: string[];
		ingredients: string[];
	};
	totalPrice: number;
}

export const initialState: IBurger = {
	ingredients: {
		bun: [],
		saucesAndMain: [],
	},
	toOrder: {
		ingredients: [],
		bun: [],
	},
	totalPrice: 0,
};

export const burgerSlice = createSlice({
	name: 'burger',
	initialState,
	reducers: {
		addIngredient: {
			reducer: (state, action: PayloadAction<IngredientsPropWithKey>) => {
				if (action.payload.type === 'bun') {
					state.ingredients.bun.push(action.payload, action.payload);
					state.toOrder.bun.push(action.payload._id);
					state.totalPrice += action.payload.price * 2;
				} else {
					state.ingredients.saucesAndMain.push(action.payload);
					state.toOrder.ingredients.push(action.payload._id);
					state.totalPrice += action.payload.price;
				}
			},
			prepare: (ingredient: IngredientsPropWithKey) => ({
				payload: {
					...ingredient,
					key: process.env.NODE_ENV === 'test' ? ingredient.key : nanoid(),
				},
			}),
		},
		deleteIngredient: (
			state,
			action: PayloadAction<IngredientsPropWithKey>
		) => {
			if (action.payload.type === 'bun') {
				state.ingredients.bun = state.ingredients.bun.filter(
					(item) => item.key !== action.payload.key
				);
				state.totalPrice -= action.payload.price * 2;
				state.toOrder.bun.pop();
			} else {
				state.ingredients.saucesAndMain =
					state.ingredients.saucesAndMain.filter(
						(item) => item.key !== action.payload.key
					);
				state.totalPrice -= action.payload.price;
				const start = state.toOrder.ingredients.findIndex(
					(item) => item === action.payload._id
				);
				state.toOrder.ingredients.splice(start, 1);
			}
		},
		moveIngredient: (
			state,
			action: PayloadAction<{ draggedIndex: number; targetIndex: number }>
		) => {
			if (
				action.payload.draggedIndex > state.ingredients.saucesAndMain.length ||
				action.payload.targetIndex > state.ingredients.saucesAndMain.length ||
				action.payload.draggedIndex == action.payload.targetIndex
			)
				throw new Error('Не допустимые draggedIndex или targetIndex');
			const temp = state.ingredients.saucesAndMain[action.payload.targetIndex];
			state.ingredients.saucesAndMain[action.payload.targetIndex] =
				state.ingredients.saucesAndMain[action.payload.draggedIndex];
			state.ingredients.saucesAndMain[action.payload.draggedIndex] = temp;
		},
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		resetBurger: (state) => (state = initialState),
	},
});

export const { reducer } = burgerSlice;
export const { addIngredient, deleteIngredient, moveIngredient, resetBurger } =
	burgerSlice.actions;
