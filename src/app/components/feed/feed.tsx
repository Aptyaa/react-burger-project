import React, { useCallback } from 'react';
import FeedItem from './feed-item/feed-item';
import style from './feed.module.scss';
import { useGetIngredientsQuery } from '../../services/app-api';
import { takeIngredientsAndReturnPrice } from '../../services/utils';
import Loader from '../loader/loader';
import { useGetRightOrders } from '../hooks/useGetRightOrders';
import clsx from 'clsx';

interface IFeedProps {
	variant?: string;
}

export default function Feed({ variant = 'public_orders' }: IFeedProps) {
	const { data: ingredientsData, isLoading: isLoadingIngredients } =
		useGetIngredientsQuery();
	const { data, isLoading } = useGetRightOrders();
	const styleFeed = style[variant];
	const totalCost = useCallback(
		(arg: string[]) =>
			takeIngredientsAndReturnPrice(ingredientsData?.data)(arg),
		[ingredientsData]
	);
	if (isLoading || isLoadingIngredients || !data?.success) return <Loader />;
	return (
		<div className={clsx(style.container, styleFeed)}>
			{data &&
				data.orders &&
				data.orders.map((order) => (
					<FeedItem
						key={order._id}
						number={order.number}
						name={order.name}
						createdAt={new Date(order.createdAt)}
						cost={totalCost(order.ingredients)}
						ingredients={order.ingredients}
						status={order.status}
					/>
				))}
		</div>
	);
}
