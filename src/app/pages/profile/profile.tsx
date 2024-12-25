import styles from './profile.module.scss';
import Navigation from './navigation/navigation';
import { Outlet } from 'react-router-dom';

export default function Profile() {
	return (
		<div className={styles.container}>
			<Navigation />
			<Outlet />
		</div>
	);
}
