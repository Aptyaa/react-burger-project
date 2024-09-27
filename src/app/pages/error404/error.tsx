import React from 'react';
import styles from './error.module.scss';
import { Link } from 'react-router-dom';

export default function Error404() {
	return (
		<section className={styles.container}>
			<h1>404</h1>
			<p className='text text_type_main-medium mb-10'>
				Извините, но такой страницы не существует
			</p>
			<Link to='/'>Вернуться на главный экран</Link>
		</section>
	);
}
