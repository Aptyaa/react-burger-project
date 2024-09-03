import React from 'react';
import { IngredientsProp } from '../../../const';
import styles from './ingredient-details.module.scss';

interface IngredientDetailsProp {
	ingredient: IngredientsProp;
}

export default function IngredientDetails({
	ingredient,
}: IngredientDetailsProp) {
	return (
		<div className={styles.container}>
			<img
				className={`${styles.image} mb-4 pl-5 pr-5`}
				src={ingredient.image_large}
				alt='Фото ингредиента'
			/>
			<span className='mb-8 text text_type_main-medium'>{ingredient.name}</span>
			<div
				className={`${styles.nutrition_wrapper} text text_type_main-default `}>
				<span>
					Калории, ккал{' '}
					<span className='text_type_digits-default'>
						{' '}
						{ingredient.calories}
					</span>
				</span>
				<span>
					Белки, г{' '}
					<span className='text_type_digits-default'>
						{ingredient.proteins}
					</span>
				</span>
				<span>
					Жиры, г{' '}
					<span className='text_type_digits-default'> {ingredient.fat}</span>
				</span>
				<span>
					Углеводы, г{' '}
					<span className='text_type_digits-default'>
						{ingredient.carbohydrates}
					</span>
				</span>
			</div>
		</div>
	);
}
