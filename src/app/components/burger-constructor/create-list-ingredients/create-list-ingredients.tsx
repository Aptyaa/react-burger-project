import {
	ConstructorElement,
	DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import React, { memo } from 'react';
import { IngredientsProp } from '../../../const';
import styles from './create-list-ingredients.module.scss';

interface CreateListProp {
	ingredients: IngredientsProp[];
}

function CreateListIngredients({ ingredients }: CreateListProp) {
	return (
		<div>
			<span>
				<ConstructorElement
					extraClass='mr-2 ml-8 mb-4'
					type={'top'}
					isLocked={true}
					text={`${ingredients[0]['name']} (верх)`}
					price={ingredients[0].price}
					thumbnail={ingredients[0].image}
				/>
			</span>
			<ul className={`${styles.list}`}>
				{ingredients.map((item) => {
					return (
						<li key={item._id}>
							<DragIcon type='primary' />
							<ConstructorElement
								extraClass='mr-2 ml-2 mb-4'
								type={undefined}
								isLocked={false}
								text={item.name}
								price={item.price}
								thumbnail={item.image}
							/>
						</li>
					);
				})}
			</ul>
			<span>
				<ConstructorElement
					extraClass='mr-2 ml-8 mb-4'
					type={'bottom'}
					isLocked={true}
					text={`${ingredients[0].name} (низ)`}
					price={ingredients[0].price}
					thumbnail={ingredients[0].image}
				/>
			</span>
		</div>
	);
}

export default memo(CreateListIngredients);
