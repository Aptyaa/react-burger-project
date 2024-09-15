import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IngredientsProp } from '../../types';

interface IStateIngredientPreview {
	ingredient: IngredientsProp | null;
}

const initialState: IStateIngredientPreview | null = {
	ingredient: null,
};

export const ingredientSlice = createSlice({
	name: 'ingredientPreview',
	initialState,
	reducers: {
		addToPreview: (state, action: PayloadAction<IngredientsProp>) =>
			void (state.ingredient = action.payload),
		deleteFromPreview: (state) => void (state.ingredient = null),
	},
});

export const { addToPreview, deleteFromPreview } = ingredientSlice.actions;
export const reducer = ingredientSlice.reducer;
