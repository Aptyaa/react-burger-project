import MenuItem from './menu-item/menu-item';
import {
	Logo,
	BurgerIcon,
	ListIcon,
	ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './app-header.module.scss';
import { NavLink, Link } from 'react-router-dom';

export default function AppHeader() {
	return (
		<header className={styles.header}>
			<nav className={styles.navigation}>
				<div className={styles.nav_container}>
					<NavLink
						to='/'
						className={({ isActive }) => (isActive ? styles.isActive : '')}>
						{({ isActive }) => (
							<MenuItem
								value='constructor'
								icon={<BurgerIcon type={isActive ? 'primary' : 'secondary'} />}>
								Конструктор
							</MenuItem>
						)}
					</NavLink>
					<NavLink
						to='/feed'
						className={({ isActive }) => (isActive ? styles.isActive : '')}>
						{({ isActive }) => (
							<MenuItem
								value='orders'
								icon={<ListIcon type={isActive ? 'primary' : 'secondary'} />}>
								Лента заказов
							</MenuItem>
						)}
					</NavLink>
				</div>
				<Link to='/' className={styles.logo}>
					<Logo />
				</Link>
				<NavLink
					to='/profile'
					className={({ isActive }) => (isActive ? styles.isActive : '')}>
					{({ isActive }) => (
						<MenuItem
							value='profile'
							icon={<ProfileIcon type={isActive ? 'primary' : 'secondary'} />}>
							Личный кабинет
						</MenuItem>
					)}
				</NavLink>
			</nav>
		</header>
	);
}
