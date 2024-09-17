import {
	ConstructorElement,
	DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import React, { memo, useRef } from 'react';
import {
	deleteIngredient,
	IngredientsPropWithKey,
	moveIngredient,
} from '../../../services/slices/burger-slice';
import { useDrag, useDrop } from 'react-dnd';
import styles from './burger-constructor-element.module.scss';
import { useAppDispatch, useAppSelector } from '../../../services/hooks';
import { IDropItemConstructor } from '../../../types';

interface BurgerConstructorElementProp {
	item: IngredientsPropWithKey;
	position?: 'top' | 'bottom' | undefined;
	isLocked?: boolean;
	index?: number;
}

function BurgerConstructorElement({
	item,
	position = undefined,
	isLocked = false,
	index,
}: BurgerConstructorElementProp) {
	const { key, name, image, price } = item;
	const ingredients = useAppSelector((store) => store.burger.ingredients);
	const dispatch = useAppDispatch();
	const ref = useRef(null);
	const [{ isDragging }, dragRef] = useDrag({
		type: 'sortIngredients',
		item: { index },
		collect: (monitor) => ({
			isDragging: monitor.isDragging(),
		}),
	});

	const [, dropRef] = useDrop({
		accept: 'sortIngredients',
		hover: (item: IDropItemConstructor, monitor) => {
			if (!ref.current) {
				return;
			}
			const dragIndex = item.index;
			const hoverIndex = index;
			if (dragIndex === hoverIndex) return;
			const hoverBoundingRect = (
				ref.current as unknown as Element
			).getBoundingClientRect();
			const hoverMiddleY =
				(hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
			const clientOffset = monitor.getClientOffset();
			const hoverClientY = clientOffset!.y - hoverBoundingRect.top;
			if (dragIndex < hoverIndex! && hoverClientY < hoverMiddleY) {
				return;
			}
			if (dragIndex > hoverIndex! && hoverClientY > hoverMiddleY) {
				return;
			}
			console.log(dragIndex, hoverIndex);
			dispatch(
				moveIngredient({
					draggedIndex: item.index,
					targetIndex: hoverIndex!,
				})
			);
			item.index = hoverIndex!;
		},
	});

	const handleClick = () => {
		dispatch(
			deleteIngredient(
				ingredients.saucesAndMain.find(
					(item) => item.key === key
				) as IngredientsPropWithKey
			)
		);
	};

	const opacity = isDragging ? 0 : 1;
	dragRef(dropRef(ref));
	return (
		<div
			style={{ ...styles, opacity }}
			className={styles.container}
			ref={position === undefined ? ref : null}>
			<span className={styles.icon}>
				{!position && <DragIcon type='primary' />}
			</span>
			<ConstructorElement
				extraClass='mr-2 ml-2 mb-4'
				type={position}
				isLocked={isLocked}
				text={name}
				price={price}
				thumbnail={image}
				handleClose={handleClick}
			/>
		</div>
	);
}

export default memo(BurgerConstructorElement);
