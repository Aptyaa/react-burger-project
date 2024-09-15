import React, { forwardRef, LegacyRef, memo } from 'react';
import BurgerIngredientsItem from '../burger-ingredients-item/burger-ingredients-item';
import styles from './ingredients-block.module.scss';
import { IngredientsProp } from '../../../types';

interface IngredientsBlockProps {
	children: string;
	ingredients: IngredientsProp[];
	name: string;
	handleOpenModal: (e: React.MouseEvent<HTMLElement>) => void;
}

export const IngredientsBlock = memo(
	forwardRef(
		(
			{ children, ingredients, name, handleOpenModal }: IngredientsBlockProps,
			ref: LegacyRef<HTMLDivElement>
		) => {
			return (
				<div ref={ref} data-name={name}>
					<p className='mt-10 mb-6 text text_type_main-medium'>{children}</p>
					<div className={styles.box_item}>
						{ingredients &&
							ingredients.map((ingredient) => {
								return (
									<BurgerIngredientsItem
										id={ingredient._id}
										onClick={handleOpenModal}
										key={ingredient._id}
										name={ingredient.name}
										img={ingredient.image}
										price={ingredient.price}
										type={ingredient.type}
									/>
								);
							})}
					</div>
				</div>
			);
		}
	)
);

IngredientsBlock.displayName = 'IngredientsBlock';
