import styles from './order-details.module.scss';
import { CheckMarkIcon } from '@ya.praktikum/react-developer-burger-ui-components';

interface OrderDetailsProp {
	name?: string;
	order: {
		number: number;
	};
	success?: boolean;
}

export default function OrderDetails({ name, order }: OrderDetailsProp) {
	return (
		<div className={styles.container}>
			<p className='mt-20 mb-8  text text_type_digits-large'>{order.number}</p>
			<p className='mb-15 text text_type_main-medium'>{name}</p>
			<span className={styles.approve_order}>
				<CheckMarkIcon type='primary' />
			</span>

			<p className='mt-15 mb-2 text text_type_main-small'>
				Ваш заказ начали готовить
			</p>
			<p className={`text text_type_main-small ${styles.addition_text}`}>
				Дождитесь готовности на орбитальной станции
			</p>
		</div>
	);
}
