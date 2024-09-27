import React, { useEffect, useState } from 'react';
import {
	Button,
	Input,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './login.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../../services/app-api';
import Loader from '../../components/loader/loader';

export default function Login() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [login, { data, isLoading }] = useLoginMutation();
	const navigate = useNavigate();

	useEffect(() => {
		data?.success && navigate('/');
	}, [data]);

	const handleSubmit = (e: React.SyntheticEvent) => {
		e.preventDefault();
		login({ email, password });
	};

	const showPassword = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		const prevType = (e.currentTarget
			.previousElementSibling as HTMLInputElement)!.type;
		(e.currentTarget.previousElementSibling as HTMLInputElement).type =
			prevType === 'text' ? 'password' : 'text';
	};

	if (isLoading) return <Loader />;
	return (
		<section className={styles.container}>
			<h2 className='mb-6'>Вход</h2>
			<form onSubmit={handleSubmit}>
				<Input
					placeholder='E-mail'
					value={email || ''}
					onChange={(e) => setEmail(e.target.value)}
					extraClass='mb-6'
					type='email'
				/>
				<Input
					placeholder='Пароль'
					type='password'
					value={password || ''}
					onChange={(e) => setPassword(e.target.value)}
					extraClass='mb-6'
					icon='HideIcon'
					onIconClick={showPassword}
				/>
				<Button htmlType='submit' type='primary' extraClass='mb-20'>
					Войти
				</Button>
			</form>
			<div className='mb-4'>
				Вы новый пользователь? <Link to='/register'>Зарегестрироваться</Link>
			</div>
			<div>
				Забыли пароль? <Link to='/forgot-password'>Восстановить пароль</Link>
			</div>
		</section>
	);
}
