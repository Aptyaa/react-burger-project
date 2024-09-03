import { useCallback, useState } from 'react';
import {
	Button,
	CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { IngredientsProp } from '../../const';
import styles from './burger-constructor.module.scss';
import OrderDetails from '../modal/order-details/order-details';
import Modal from '../modal/modal';
import CreateListIngredients from './create-list-ingredients/create-list-ingredients';

interface IBurgerConstructor {
	ingredients: IngredientsProp[];
}

function BurgerConstructor({ ingredients }: IBurgerConstructor) {
	const [modalIsOpen, setModalIsOpen] = useState(false);

	const handleClick = useCallback(() => {
		setModalIsOpen(true);
	}, []);
	return (
		<section className={`${styles.container} mt-25 pb-13`}>
			<Modal isOpen={modalIsOpen} setIsOpen={setModalIsOpen}>
				<OrderDetails />
			</Modal>
			{ingredients.length > 0 && (
				<CreateListIngredients ingredients={ingredients} />
			)}
			<div className={styles.order_block}>
				<span className={`${styles.total_price}`}>
					500
					<CurrencyIcon type='primary' className='ml-3' />
				</span>
				<Button
					onClick={handleClick}
					type='primary'
					size='medium'
					htmlType='button'>
					Оформить заказ
				</Button>
			</div>
		</section>
	);
}

export default BurgerConstructor;
