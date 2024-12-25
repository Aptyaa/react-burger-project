import React, { useEffect, useState } from 'react';
import {
	Button,
	Input,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './reset-password.module.scss';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useResetPasswordMutation } from '../../services/app-api';
import { getMessageError } from '../../services/utils';

export default function ResetPassword() {
	const [password, setPassword] = useState('');
	const [token, setToken] = useState('');
	const [resetPassword, { data, error }] = useResetPasswordMutation();
	const navigate = useNavigate();
	const location = useLocation();

	useEffect(() => {
		data?.success && navigate('/login');
	}, [data]);

	if (location.state?.from.pathname !== '/forgot-password') {
		return <Navigate to='/forgot-password' replace />;
	}

	const handleSubmit = async (e: React.SyntheticEvent) => {
		e.preventDefault();
		await resetPassword({ password, token });
		setToken('');
	};

	return (
		<section className={styles.container}>
			<h2 className='mb-6'>Восстановление пароля</h2>
			<form onSubmit={handleSubmit}>
				<Input
					placeholder='Введите новый пароль'
					value={password || ''}
					onChange={(e) => setPassword(e.target.value)}
					extraClass='mb-6'
				/>
				<Input
					placeholder='Введите код из письма'
					value={token || ''}
					onChange={(e) => setToken(e.target.value)}
					extraClass='mb-6'
					error={token === '' && !!error}
					errorText={getMessageError(error)}
				/>

				<Button htmlType='submit' type='primary' extraClass='mb-20'>
					Сохранить
				</Button>
			</form>
			<div className='mb-4'>
				Вспомнили пароль? <Link to='/login'>Войти</Link>
			</div>
		</section>
	);
}
