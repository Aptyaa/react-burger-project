import style from './feed-item.module.scss';
import IngredientsBar from './ingredients-bar/ingredients-bar';
import { FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useLocation } from 'react-router-dom';
import { translateStatus } from '../../../services/utils';

interface IFeedItemProps {
	number: number;
	name: string;
	createdAt: Date;
	cost: number;
	ingredients?: string[];
	status: string;
	onClick?: () => void;
}

export default function FeedItem({
	number,
	name,
	createdAt,
	cost,
	ingredients,
	status,
}: IFeedItemProps) {
	const { pathname } = useLocation();

	const className =
		status === 'done'
			? style.done
			: status === 'cancel'
			? style.cancel
			: style.common;
	return (
		<Link
			to={`${pathname}/${number}`}
			state={{ background: location.pathname, cost }}
			className={style.link}>
			<div className={`${style.container} p-6 mb-4`}>
				<div
					className={`${style.order_number} mb-6 text text_type_digits-default`}>
					<span>#{number}</span>{' '}
					<span className={style.time}>
						<FormattedDate date={createdAt} />
					</span>
				</div>
				<div className={'mb-6 text text_type_main-medium'}>
					{name}
					{pathname === '/orders' ? (
						<p
							className={`${className} ${style.status} text text_type_main-small`}>
							{translateStatus(status)}
						</p>
					) : null}
				</div>
				<div className={style.ingredients}>
					{<IngredientsBar ingredients={ingredients || []} cost={cost} />}
				</div>
			</div>
		</Link>
	);
}
