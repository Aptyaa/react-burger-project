import React from 'react';
import styles from './navigation.module.scss';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { NavLink } from 'react-router-dom';
import { useLogoutMutation, appApi } from '../../../services/app-api';
import clsx from 'clsx';
import { useAppDispatch } from '../../../services/hooks';

export default function Navigation() {
	const [logout] = useLogoutMutation();
	const dispatch = useAppDispatch();

	const handleClick = async () => {
		await logout();
		dispatch(appApi.util.resetApiState());
	};

	return (
		<div className={clsx(styles.container, 'text text_type_main-medium')}>
			<NavLink
				className={({ isActive }) => (isActive ? styles.isActive : '')}
				to='/profile'>
				Профиль
			</NavLink>
			<NavLink
				className={({ isActive }) => (isActive ? styles.isActive : '')}
				to='/order-history'>
				История заказов
			</NavLink>
			<Button
				extraClass={styles.button}
				type='secondary'
				htmlType='button'
				onClick={handleClick}>
				Выход
			</Button>
			<p className={clsx(styles.description, 'mt-20')}>
				В этом разделе вы можете изменить свои персональные данные
			</p>
		</div>
	);
}
