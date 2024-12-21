import OrderInProgress from '../../components/order-in-progress/order-in-progress';
import Feed from '../../components/feed/feed';
import style from './orders.module.scss';
import { useGetOrdersWSQuery } from '../../services/app-api';
import Loader from '../../components/loader/loader';

export default function Orders() {
	const { data, isLoading } = useGetOrdersWSQuery();
	console.log(isLoading);
	console.log(data);
	if (isLoading || !data?.success) return <Loader />;
	return data ? (
		<div className={'mt-10'}>
			<p className='mb-5 text text_type_main-large'>Лента заказов</p>
			<div className={style.wrapper}>
				<Feed />
				<OrderInProgress orders={data} />
			</div>
		</div>
	) : (
		<Loader />
	);
}
