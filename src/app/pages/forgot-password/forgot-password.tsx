import React, { useState } from 'react';
import {
	Button,
	Input,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './forgot-password.module.scss';
import { useForgotPasswordMutation } from '../../services/app-api';
import { Link, Navigate, useLocation } from 'react-router-dom';
import Loader from '../../components/loader/loader';

export default function ForgotPassword() {
	const [email, setEmail] = useState('');
	const [forgotPassword, { data, isLoading }] = useForgotPasswordMutation();
	const location = useLocation();

	const handleClick = async (e: React.SyntheticEvent) => {
		e.preventDefault();
		await forgotPassword({ email });
	};
	if (isLoading) return <Loader />;

	{
		return data?.success ? (
			<Navigate to='/reset-password' state={{ from: location }} />
		) : (
			<section className={styles.container}>
				<h2 className='mb-6'>Восстановление пароля</h2>

				<form onSubmit={handleClick}>
					<Input
						placeholder='Укажите e-mail'
						value={email || ''}
						onChange={(e) => setEmail(e.target.value)}
						extraClass='mb-6'
					/>

					<Button htmlType='submit' type='primary' extraClass='mb-20'>
						Восстановить
					</Button>
				</form>
				<div className='mb-4'>
					Вспомнили пароль? <Link to='/login'>Войти</Link>
				</div>
			</section>
		);
	}
}
