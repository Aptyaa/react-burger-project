import React, { memo } from 'react';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-ingridients-item.module.scss';

interface BurgerIngredientItemProps {
	name: string;
	price: number;
	img: string;
	id: string;
	onClick: (e: React.MouseEvent<HTMLElement>) => void;
}
function BurgerIngredientsItem(props: BurgerIngredientItemProps) {
	const { name, price, img, onClick, id } = props;

	return (
		<div data-id={id} className={styles.item} onClick={onClick}>
			<img src={img} alt={name} />
			<span className={styles.count}>2</span>
			<div className={styles.wrapper_price}>
				{price}
				<span>
					<CurrencyIcon type='primary' />
				</span>
			</div>
			{name}
		</div>
	);
}

export default memo(BurgerIngredientsItem);
