import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useGetUserQuery } from '../../services/app-api';

interface ProtectedRouteElementProps {
	component: React.ReactNode;
	onlyUnAuth?: boolean;
}

export default function ProtectedRouteElement({
	onlyUnAuth = false,
	component,
}: ProtectedRouteElementProps) {
	const { data } = useGetUserQuery();
	const location = useLocation();

	if (!onlyUnAuth && !data?.user) {
		return <Navigate to='/login' state={{ from: location }} />;
	}

	if (onlyUnAuth && data?.user) {
		const { from } = location.state ?? { from: { pathname: '/' } };

		return <Navigate to={from} />;
	}

	return component;
}

export const OnlyAuth = ProtectedRouteElement;
export const OnlyUnAuth = ({ component }: { component: React.ReactNode }) => {
	return <ProtectedRouteElement onlyUnAuth={true} component={component} />;
};
