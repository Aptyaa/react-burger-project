import style from './order-ingredients.module.scss';
import {
	CurrencyIcon,
	FormattedDate,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useLocation, useParams } from 'react-router-dom';
import {
	useGetIngredientsQuery,
	useGetOrderByNumberQuery,
} from '../../../services/app-api';
import Loader from '../../loader/loader';
import OrderIngredientsItem from './order-ingredients-item/order-ingredients-item';
import {
	countSameIngredientInOrder,
	takeIngredientsAndReturnPrice,
} from '../../../services/utils';
import { useGetRightOrders } from '../../hooks/useGetRightOrders';

export default function OrderIngredients() {
	const { number } = useParams();
	const { state } = useLocation();

	const { data: orderInfo, isLoading: loadingOnOrder } =
		useGetOrderByNumberQuery(Number(number), { skip: !!state });

	const { data, isLoading } = useGetRightOrders();
	const { data: ingredientsList } = useGetIngredientsQuery();

	const cost =
		state?.cost ||
		(orderInfo &&
			ingredientsList &&
			takeIngredientsAndReturnPrice(ingredientsList?.data)(
				orderInfo.orders[0].ingredients
			));

	const ingredientById = ingredientsList && ingredientsList.ingredientById;

	const orderByNumber = data && data.orderByNumber;
	const status =
		number &&
		orderByNumber &&
		(orderByNumber[number]?.status === 'done'
			? 'Выполнен'
			: orderByNumber?.[number]?.status === 'created'
			? 'Создан'
			: 'Готовится');
	const ingredientsFromEntries =
		orderByNumber &&
		number &&
		countSameIngredientInOrder(orderByNumber?.[number]?.ingredients);

	if (isLoading || loadingOnOrder) return <Loader />;

	return (
		<div className={style.container}>
			{number && data?.success && ingredientById ? (
				<>
					<p className={style.order_number}>#{number}</p>
					<p className={style.order_name}>{orderByNumber?.[number].name}</p>
					<p className={style.order_status}>{status}</p>
					<p className='text text_type_main-medium mb-6'>Состав:</p>
					<div className={style.wrapper_list}>
						{(ingredientsFromEntries as [string, number][]).map(
							([ingredientId, count], index) => {
								return (
									<OrderIngredientsItem
										key={index}
										img={ingredientById[ingredientId].image_mobile}
										name={ingredientById[ingredientId].name}
										price={ingredientById[ingredientId].price}
										count={count}
									/>
								);
							}
						)}
					</div>
					<div className={style.wrapper_dateAndCost}>
						<span>
							<FormattedDate
								date={new Date(orderByNumber?.[number].createdAt || '')}
							/>
						</span>
						<span className={style.wrapper_totalPrice}>
							{cost || null} <CurrencyIcon type='primary' className='ml-3' />
						</span>
					</div>
				</>
			) : (
				<Loader />
			)}
		</div>
	);
}
