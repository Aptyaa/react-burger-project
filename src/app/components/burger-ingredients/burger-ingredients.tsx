import React, { useCallback, useState } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerIngredientsItem from './burger-ingredients-item/burger-ingredients-item';
import styles from './burger-ingredients.module.scss';
import { IngredientsProp } from './../../const';
import Modal from '../modal/modal';
import IngredientDetails from '../modal/ingredient-details/ingredient-details';

interface BurgerIngredientsProp {
	ingredients: IngredientsProp[];
}

export default function BurgerIngredients({
	ingredients,
}: BurgerIngredientsProp) {
	const [current, setCurrent] = useState('buns');
	const [ingredient, setIngredient] = useState<IngredientsProp | null>(null);
	const [modalIsOpen, setModalIsOpen] = useState(false);

	const sortByTypeIngredients = (ingredients: IngredientsProp[]) => {
		const buns: IngredientsProp[] = [];
		const sauces: IngredientsProp[] = [];
		const main: IngredientsProp[] = [];
		ingredients.forEach((item) => {
			item.type === 'bun'
				? buns.push(item)
				: item.type === 'sauce'
				? sauces.push(item)
				: main.push(item);
		});
		return [
			['Булки', buns],
			['Соусы', sauces],
			['Начинки', main],
		];
	};

	const sortedIngredients = sortByTypeIngredients(ingredients);

	const handleClick = useCallback(
		(e: React.MouseEvent<HTMLElement>) => {
			const a = ingredients?.filter(
				(item) => item._id === e.currentTarget.dataset.id
			);
			setModalIsOpen(true);
			setIngredient(a[0]);
		},
		[ingredients]
	);

	const tabs = (
		<div className={`${styles.tab_ingredients}`}>
			<Tab value='buns' active={current === 'Булки'} onClick={setCurrent}>
				Булки
			</Tab>
			<Tab value='sauces' active={current === 'sauces'} onClick={setCurrent}>
				Соусы
			</Tab>
			<Tab value='main' active={current === 'main'} onClick={setCurrent}>
				Начинки
			</Tab>
		</div>
	);

	return (
		<section className={styles.container}>
			<Modal
				header='Детали ингредиента'
				isOpen={modalIsOpen}
				setIsOpen={setModalIsOpen}>
				<IngredientDetails ingredient={ingredient!} />
			</Modal>
			<div className='pt-10'>
				<p className='text text_type_main-large mb-5'>Соберите бургер</p>
				{tabs}
			</div>
			<div className={styles.wrapper_ingredients}>
				{sortedIngredients.length > 0 &&
					sortedIngredients.map((item, index) => {
						return (
							<div key={index}>
								<p className='mt-10 mb-6 text text_type_main-medium'>
									{item[0] as string}
								</p>
								<div className={styles.box_item}>
									{(item[1] as IngredientsProp[]).map((ingredient) => {
										return (
											<BurgerIngredientsItem
												id={ingredient._id}
												onClick={handleClick}
												key={ingredient._id}
												name={ingredient.name}
												img={ingredient.image}
												price={ingredient.price}
											/>
										);
									})}
								</div>
							</div>
						);
					})}
			</div>
		</section>
	);
}
