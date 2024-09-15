import React, { memo, useCallback } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { isFetchBaseQueryErrorType } from '../../types';
import Modal from '../modal/modal';
import IngredientDetails from '../modal/ingredient-details/ingredient-details';
import { useModal } from '../hooks/useModal';
import { useGetIngredientsQuery } from '../../services/app-api';
import { useAppDispatch } from '../../services/hooks';
import {
	addToPreview,
	deleteFromPreview,
} from '../../services/slices/ingredient-slice';
import { IngredientsBlock } from './ingredientss-block/ingredients-block';
import { useCurrentTab } from '../hooks/useCurrentTab';
import styles from './burger-ingredients.module.scss';

function BurgerIngredients() {
	const { modalIsOpen, openModal, closeModal } = useModal();
	const {
		data: fetchedIngredients,
		isLoading,
		error,
	} = useGetIngredientsQuery();
	const dispatch = useAppDispatch();
	const {
		currentTab,
		setCurrentTab,
		onScroll,
		refBun,
		refMain,
		refSauces,
		rootRef,
	} = useCurrentTab();

	const handleOpenModal = useCallback(
		(e: React.MouseEvent<HTMLElement>) => {
			const ingredient = fetchedIngredients!.data.find(
				(item) => item._id === e.currentTarget.dataset.id
			);
			ingredient && dispatch(addToPreview(ingredient));
			openModal();
		},
		[fetchedIngredients]
	);
	const handleCloseModal = useCallback(() => {
		dispatch(deleteFromPreview());
		closeModal();
	}, []);

	const tabs = (
		<div className={`${styles.tab_ingredients}`}>
			<Tab value='buns' active={currentTab === 'buns'} onClick={setCurrentTab}>
				Булки
			</Tab>
			<Tab
				value='sauces'
				active={currentTab === 'sauces'}
				onClick={setCurrentTab}>
				Соусы
			</Tab>
			<Tab value='main' active={currentTab === 'main'} onClick={setCurrentTab}>
				Начинки
			</Tab>
		</div>
	);

	if (isLoading) return <h1>Загрузка ингредиентов ...</h1>;
	if (error && isFetchBaseQueryErrorType(error)) {
		return <h1>Ошибка загрузки: {error.status}</h1>;
	} else if (error) return <h1>Ошибка загрузки: {error.message}</h1>;

	return (
		<section className={styles.container}>
			{modalIsOpen && (
				<Modal header='Детали ингредиента' closeModal={handleCloseModal}>
					<IngredientDetails />
				</Modal>
			)}

			<div className='pt-10'>
				<p className='text text_type_main-large mb-5'>Соберите бургер</p>
				{tabs}
			</div>

			{fetchedIngredients && (
				<div
					ref={rootRef}
					onScroll={onScroll}
					className={styles.wrapper_ingredients}>
					<IngredientsBlock
						name='bun'
						ref={refBun}
						handleOpenModal={handleOpenModal}
						ingredients={fetchedIngredients?.ingredients.buns}>
						Булки
					</IngredientsBlock>
					<IngredientsBlock
						name='sauces'
						ref={refSauces}
						handleOpenModal={handleOpenModal}
						ingredients={fetchedIngredients?.ingredients.sauces}>
						Соусы
					</IngredientsBlock>
					<IngredientsBlock
						name='main'
						ref={refMain}
						handleOpenModal={handleOpenModal}
						ingredients={fetchedIngredients?.ingredients.main}>
						Начинки
					</IngredientsBlock>
				</div>
			)}
		</section>
	);
}

export default memo(BurgerIngredients);
