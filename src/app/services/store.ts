import { configureStore } from '@reduxjs/toolkit';
import { appApi } from './app-api';
import { reducer as ingredientReducer } from './slices/ingredient-slice';
import { reducer as burgerReducer } from './slices/burger-slice';

export const store = configureStore({
	reducer: {
		[appApi.reducerPath]: appApi.reducer,
		ingredient: ingredientReducer,
		burger: burgerReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(appApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
