import {
	Button,
	CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-constructor.module.scss';
import OrderDetails from '../modal/order-details/order-details';
import Modal from '../modal/modal';
import CreateListIngredients from './create-list-ingredients/create-list-ingredients';
import { useModal } from '../hooks/useModal';
import { useConfirmOrderMutation } from '../../services/app-api';
import { useAppSelector } from '../../services/hooks';

function BurgerConstructor() {
	const { modalIsOpen, closeModal, openModal } = useModal();
	const [confirmOrder, { data: orderData, error }] = useConfirmOrderMutation();

	const ingredientsToOrder = useAppSelector(
		(store) => store.burger.toOrder.ingredients
	);
	const bunToOrder = useAppSelector((store) => store.burger.toOrder.bun);
	const totalPrice = useAppSelector((store) => store.burger.totalPrice);
	const order = [...bunToOrder, ...ingredientsToOrder, ...bunToOrder];

	const handleClick = async () => {
		await confirmOrder(order);
		openModal();
	};

	return (
		<section className={`${styles.container} mt-25 pb-13`}>
			{modalIsOpen && (
				<Modal closeModal={closeModal}>
					{orderData ? (
						<OrderDetails {...orderData} />
					) : (
						<>
							Ошибка при составлении заказа...
							{JSON.stringify(error)}
						</>
					)}
				</Modal>
			)}
			<CreateListIngredients />
			<div className={styles.order_block}>
				<span className={`${styles.total_price}`}>
					{totalPrice}
					<CurrencyIcon type='primary' className='ml-3' />
				</span>
				<Button
					onClick={handleClick}
					disabled={order.length === 0 || bunToOrder.length === 0}
					type={'primary'}
					size='medium'
					htmlType='button'>
					Оформить заказ
				</Button>
			</div>
		</section>
	);
}

export default BurgerConstructor;
