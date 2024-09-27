import {
	Button,
	Input,
} from '@ya.praktikum/react-developer-burger-ui-components';
import React, { useState } from 'react';
import styles from './registration.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import { useRegisterMutation } from '../../services/app-api';

import Loader from '../../components/loader/loader';

export default function Registration() {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [register, { data, isLoading }] = useRegisterMutation();
	const navigate = useNavigate();

	const handleSubmit = async (e: React.SyntheticEvent) => {
		e.preventDefault();
		await register({ name, email, password });
		data?.success && navigate('/login');
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
			<h2 className='mb-6'>Регистрация</h2>
			<form action='submit' onSubmit={handleSubmit}>
				<Input
					autoComplete='off'
					placeholder='Имя'
					value={name || ''}
					onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
						setName(e.target.value)
					}
					extraClass='mb-6'
				/>
				<Input
					autoComplete='off'
					placeholder='E-mail'
					value={email || ''}
					onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
						setEmail(e.target.value)
					}
					extraClass='mb-6'
				/>
				<Input
					autoComplete='off'
					placeholder='Пароль'
					type='password'
					value={password || ''}
					onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
						setPassword(e.target.value)
					}
					icon='HideIcon'
					extraClass='mb-6'
					onIconClick={showPassword}
				/>
				<Button htmlType='submit' type='primary' extraClass='mb-20'>
					Зарегестрироваться
				</Button>
			</form>
			<div className='mb-4'>
				Уже зарегистрированы? <Link to='/login'>Войти</Link>
			</div>
		</section>
	);
}
