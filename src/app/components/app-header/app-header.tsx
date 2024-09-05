import React, { useState } from 'react';
import MenuItem from './menu-item/menu-item';
import {
	Logo,
	BurgerIcon,
	ListIcon,
	ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './app-header.module.scss';

export default function AppHeader() {
	const [currentNav, setCurrentNav] = useState('constructor');

	const handleClick = (e: React.MouseEvent<HTMLElement>) => {
		setCurrentNav(e.currentTarget.dataset.value as string);
	};

	return (
		<header className={styles.header}>
			<nav className={styles.navigation}>
				<div className={styles.nav_container}>
					<MenuItem
						onClick={handleClick}
						value='constructor'
						icon={
							<BurgerIcon
								type={currentNav === 'constructor' ? 'primary' : 'secondary'}
							/>
						}>
						Конструктор
					</MenuItem>
					<MenuItem
						onClick={handleClick}
						value='orders'
						icon={
							<ListIcon
								type={currentNav === 'orders' ? 'primary' : 'secondary'}
							/>
						}>
						Лента заказов
					</MenuItem>
				</div>
				<span className={styles.logo}>
					<Logo />
				</span>
				<MenuItem
					onClick={handleClick}
					value='profile'
					icon={
						<ProfileIcon
							type={currentNav === 'profile' ? 'primary' : 'secondary'}
						/>
					}>
					Личный кабинет
				</MenuItem>
			</nav>
		</header>
	);
}
