import React from 'react';
import style from './order-in-progress.module.scss';
import { IOrdersResponse, isOrdersGuard } from '../../types';

interface IOrderInProgressProps {
	orders: IOrdersResponse;
}

export default function OrderInProgress({ orders }: IOrderInProgressProps) {
	const ready: number[] = [];
	const inProgress: number[] = [];

	if (isOrdersGuard(orders)) {
		orders.orders.forEach((el) => {
			el.status === 'done' ? ready.push(el.number) : inProgress.push(el.number);
		});
	}

	return (
		<div className={style.container}>
			<div className={`${style.orders_wrapper} mb-15`}>
				<div className={`${style.status} `}>
					<span className='text text_type_main-medium'>Готовы</span>
					<div className='mt-6'>
						{ready.map((el) => (
							<span className={style.orders_ready} key={el}>
								{el}
							</span>
						))}
					</div>
				</div>
				<div className={`${style.status} mb-6`}>
					<span className='text text_type_main-medium'>В работе</span>
					<div className='mt-6'>
						{inProgress.map((el) => (
							<span className={style.orders_inProgress} key={el}>
								{el}
							</span>
						))}
					</div>
				</div>
			</div>
			<p className='text text_type_main-medium mt-15'>
				Выполнено за все время:
			</p>
			<span className={style.totalOrders}>{orders.total}</span>
			<p className='text text_type_main-medium mt-15'>Выполнено за сегодня:</p>
			<span className={style.totalOrders}>{orders.totalToday}</span>
		</div>
	);
}
