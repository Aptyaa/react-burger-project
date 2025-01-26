import React, { memo, useMemo } from 'react';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-ingridients-item.module.scss';
import { useDrag } from 'react-dnd';
import clsx from 'clsx';
import { useAppSelector } from '../../../services/hooks';
import { Link, useLocation } from 'react-router-dom';

interface BurgerIngredientItemProps {
	name: string;
	price: number;
	img: string;
	id: string;
	type: string;
}
function BurgerIngredientsItem(props: BurgerIngredientItemProps) {
	const location = useLocation();
	const { name, price, img, id, type } = props;
	const ingredients = useAppSelector((store) => store.burger.ingredients);
	const [, dragRef] = useDrag(
		{
			type: type,
			item: { id },
			collect: (monitor) => ({
				isDrag: monitor.isDragging(),
			}),
		},
		[props]
	);

	const count = useMemo(() => {
		return type === 'bun'
			? ingredients.bun.filter((item) => item._id === id)
			: ingredients.saucesAndMain.filter((item) => item._id === id);
	}, [id, type, ingredients.bun, ingredients.saucesAndMain]);

	return (
		<Link
			to={`/ingredients/${id}`}
			state={{ background: location }}
			className={styles.link}>
			<div
				data-testid='test_item'
				ref={dragRef}
				data-id={id}
				className={clsx(styles.item)}>
				<img src={img} alt={name} />
				<span className={count.length !== 0 ? styles.count : undefined}>
					{count.length !== 0 && count.length}
				</span>
				<div className={styles.wrapper_price}>
					{price}
					<span>
						<CurrencyIcon type='primary' />
					</span>
				</div>
				{name}
			</div>
		</Link>
	);
}

export default memo(BurgerIngredientsItem);
