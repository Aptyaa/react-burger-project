import { useLocation } from 'react-router-dom';
import {
	useGetOrdersWSQuery,
	useGetPersonalOrderWsQuery,
} from '../../services/app-api';

export const useGetRightOrders = () => {
	const { pathname } = useLocation();
	const publicOrders = pathname.startsWith('/feed');

	const { data: commonData, isLoading: isLoadingCommonData } =
		useGetOrdersWSQuery(undefined, {
			skip: !publicOrders,
		});
	const { data: personalData, isLoading: isLoadingPersonalData } =
		useGetPersonalOrderWsQuery(undefined, {
			skip: publicOrders,
		});

	const data = publicOrders ? commonData : personalData;
	return { data, isLoading: isLoadingCommonData || isLoadingPersonalData };
};
