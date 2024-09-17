import React, { forwardRef, LegacyRef } from 'react';
import MockItemBurger from '../../mock-item-burger/mock-item-burger';
import BurgerConstructorElement from '../../burger-constructor-element.tsx/burger-constructor-element';
import styles from './ingredients-list.module.scss';
import { IngredientsPropWithKey } from '../../../../services/slices/burger-slice';

interface IngredientsListProps {
	saucesAndMain: IngredientsPropWithKey[];
	ref: LegacyRef<HTMLDivElement>;
}

export const IngredientsList = forwardRef(
	({ saucesAndMain }: IngredientsListProps, ref: LegacyRef<HTMLDivElement>) => {
		return (
			<div ref={ref}>
				{saucesAndMain.length === 0 ? (
					<MockItemBurger position='center'>Выберите начинку</MockItemBurger>
				) : (
					<ul className={styles.list}>
						{saucesAndMain.map((item, index) => {
							return (
								<li key={item.key}>
									<BurgerConstructorElement item={item} index={index} />
								</li>
							);
						})}
					</ul>
				)}
			</div>
		);
	}
);
IngredientsList.displayName = 'IngredientsList';
