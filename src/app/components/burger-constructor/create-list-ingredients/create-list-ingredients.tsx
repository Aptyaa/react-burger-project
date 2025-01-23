import { memo } from 'react';
import MockItemBurger from '../mock-item-burger/mock-item-burger';
import { useDrop } from 'react-dnd';
import { useAppDispatch, useAppSelector } from '../../../services/hooks';
import {
	addIngredient,
	deleteIngredient,
	IngredientsPropWithKey,
} from '../../../services/slices/burger-slice';
import { useGetIngredientsQuery } from '../../../services/app-api';
import BurgerConstructorElement from '../burger-constructor-element.tsx/burger-constructor-element';
import { IDropItemIngredient } from '../../../types';
import { IngredientsList } from './ingredients-list/ingrediest-list';

function CreateListIngredients() {
	const dispatch = useAppDispatch();
	const { bun, saucesAndMain } = useAppSelector(
		(store) => store.burger.ingredients
	);
	const { data: ingredientsFetched } = useGetIngredientsQuery();

	const [, dropTargetIngredients] = useDrop<IDropItemIngredient>({
		accept: ['sauce', 'main'],
		drop(item) {
			dispatch(
				addIngredient(
					ingredientsFetched?.ingredientById[
						`${item.id}`
					] as IngredientsPropWithKey
				)
			);
		},
	});
	const [, dropTargetBun] = useDrop<IDropItemIngredient>({
		accept: 'bun',

		drop(item) {
			if (bun[0]) {
				dispatch(deleteIngredient(bun[0]));
			}
			dispatch(
				addIngredient(
					ingredientsFetched?.ingredientById[
						`${item.id}`
					] as IngredientsPropWithKey
				)
			);
		},
	});

	const renderBun = (position: 'top' | 'bottom') => {
		return bun.length === 0 ? (
			<MockItemBurger
				testid='test_target-bun'
				dropTarget={position === 'top' ? dropTargetBun : undefined}
				position={position}>
				Выберите булку
			</MockItemBurger>
		) : (
			<span ref={position === 'top' ? dropTargetBun : undefined}>
				<BurgerConstructorElement
					isLocked={true}
					position={position}
					item={bun[0]}
				/>
			</span>
		);
	};

	return (
		<div>
			{renderBun('top')}
			<IngredientsList
				saucesAndMain={saucesAndMain}
				ref={dropTargetIngredients}
			/>
			{renderBun('bottom')}
		</div>
	);
}

export default memo(CreateListIngredients);
