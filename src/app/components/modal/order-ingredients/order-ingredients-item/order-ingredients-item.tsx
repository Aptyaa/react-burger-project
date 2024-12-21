import React from 'react';
import style from './order-ingredients-item.module.scss';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

interface IOrderIngredientsItemProps {
	img: string;
	name: string;
	count?: number;
	price: number;
}

export default function OrderIngredientsItem({
	img,
	name,
	count = 1,
	price,
}: IOrderIngredientsItemProps) {
	return (
		<div className={style.wrapper}>
			<span className={style.wrapper_image}>
				<img className={style.image} src={img} alt={name} />
				{name}
			</span>

			<span className={style.wrapper_price}>
				{count}&nbsp;X&nbsp;{price}
				<CurrencyIcon type='primary' className='ml-2' />
			</span>
		</div>
	);
}
