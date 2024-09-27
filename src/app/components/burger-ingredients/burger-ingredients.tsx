import React, { memo } from 'react';
import { isFetchBaseQueryErrorType } from '../../types';
import { useGetIngredientsQuery } from '../../services/app-api';

import { IngredientsBlock } from './ingredientss-block/ingredients-block';
import { useCurrentTab } from '../hooks/useCurrentTab';
import styles from './burger-ingredients.module.scss';
import Tabs from './tabs/tabs';
import Loader from '../loader/loader';

function BurgerIngredients() {
	const {
		data: fetchedIngredients,
		isLoading,
		error,
	} = useGetIngredientsQuery();
	const { onScroll, refBun, refMain, refSauces, rootRef, currentTab } =
		useCurrentTab();

	if (error && isFetchBaseQueryErrorType(error)) {
		return <h1>Ошибка загрузки: {error.status}</h1>;
	}
	if (error) return <h1>Ошибка загрузки: {error.message}</h1>;

	return (
		<section className={styles.container}>
			<div className='pt-10'>
				<p className='text text_type_main-large mb-5'>Соберите бургер</p>
				<Tabs
					currentTab={currentTab}
					refBun={refBun}
					refMain={refMain}
					refSauces={refSauces}
				/>
			</div>

			{isLoading ? (
				<Loader />
			) : (
				fetchedIngredients && (
					<div
						ref={rootRef}
						onScroll={onScroll}
						className={styles.wrapper_ingredients}>
						<IngredientsBlock
							name='bun'
							ref={refBun}
							ingredients={fetchedIngredients?.ingredients.buns}>
							Булки
						</IngredientsBlock>
						<IngredientsBlock
							name='sauces'
							ref={refSauces}
							ingredients={fetchedIngredients?.ingredients.sauces}>
							Соусы
						</IngredientsBlock>
						<IngredientsBlock
							name='main'
							ref={refMain}
							ingredients={fetchedIngredients?.ingredients.main}>
							Начинки
						</IngredientsBlock>
					</div>
				)
			)}
		</section>
	);
}

export default memo(BurgerIngredients);
