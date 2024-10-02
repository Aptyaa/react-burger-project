import {
	Button,
	Input,
} from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';
import styles from './registration.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import { useRegisterMutation } from '../../services/app-api';

import Loader from '../../components/loader/loader';
import { useForm } from '../../components/hooks/useForm';
import { IRegisterRequest } from '../../types';

export default function Registration() {
	const { form, handleChange } = useForm({ name: '', email: '', password: '' });
	const [register, { data, isLoading }] = useRegisterMutation();
	const navigate = useNavigate();

	const handleSubmit = async (e: React.SyntheticEvent) => {
		e.preventDefault();
		await register(form as unknown as IRegisterRequest);
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
					value={form.name || ''}
					onChange={handleChange}
					extraClass='mb-6'
					name='name'
				/>
				<Input
					autoComplete='off'
					placeholder='E-mail'
					value={form.email || ''}
					onChange={handleChange}
					extraClass='mb-6'
					name='email'
				/>
				<Input
					autoComplete='off'
					placeholder='Пароль'
					type='password'
					value={form.password || ''}
					onChange={handleChange}
					icon='HideIcon'
					extraClass='mb-6'
					onIconClick={showPassword}
					name='password'
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
