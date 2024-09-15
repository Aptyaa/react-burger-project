import { memo } from 'react';
import MockItemBurger from '../mock-item-burger/mock-item-burger';
import { useDrop } from 'react-dnd';
import styles from './create-list-ingredients.module.scss';
import { useAppDispatch, useAppSelector } from '../../../services/hooks';
import {
	addIngredient,
	deleteIngredient,
} from '../../../services/slices/burger-slice';
import { useGetIngredientsQuery } from '../../../services/app-api';
import BurgerConstructorElement from '../burger-constructor-element.tsx/burger-constructor-element';
import clsx from 'clsx';
import { IDropItemIngredient } from '../../../types';

function CreateListIngredients() {
	const dispatch = useAppDispatch();
	const { bun, saucesAndMain } = useAppSelector(
		(store) => store.burger.ingredients
	);
	const { data: ingredientsFetched } = useGetIngredientsQuery();

	const findIngredientById = (id: string) => {
		return ingredientsFetched?.data.find((item) => item._id === id);
	};
	const [, dropTargetIngredients] = useDrop({
		accept: ['sauce', 'main'],
		drop(item: IDropItemIngredient) {
			dispatch(addIngredient(findIngredientById(item.id)));
		},
	});
	const [, dropTargetBun] = useDrop({
		accept: 'bun',

		drop(item: IDropItemIngredient) {
			if (bun[0]) {
				dispatch(deleteIngredient(bun[0]));
			}
			dispatch(addIngredient(findIngredientById(item.id)));
		},
	});

	const renderBun = (position: 'top' | 'bottom') => {
		return bun.length === 0 ? (
			<MockItemBurger
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

	const renderIngredients = () => {
		{
			return saucesAndMain.length === 0 ? (
				<MockItemBurger position='center'>Выберите начинку</MockItemBurger>
			) : (
				<ul className={clsx(styles.list)}>
					{saucesAndMain.map((item, index) => {
						return (
							<li key={item.key}>
								<BurgerConstructorElement item={item} index={index} />
							</li>
						);
					})}
				</ul>
			);
		}
	};

	return (
		<div>
			{renderBun('top')}
			<div ref={dropTargetIngredients}>{renderIngredients()}</div>
			{renderBun('bottom')}
		</div>
	);
}

export default memo(CreateListIngredients);
