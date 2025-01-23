import React, { useEffect, useMemo } from 'react';
import {
	Button,
	Input,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './login.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../../services/app-api';
import Loader from '../../components/loader/loader';
import { useForm } from '../../components/hooks/useForm';
import { ILoginRequest } from '../../types';
import { getMessageError } from '../../services/utils';

export default function Login() {
	const { form, handleChange } = useForm({ email: '', password: '' });
	const [login, { data, isLoading, error }] = useLoginMutation();
	const navigate = useNavigate();
	useEffect(() => {
		data?.success && navigate('/');
	}, [data]);
	const handleSubmit = (e: React.SyntheticEvent) => {
		e.preventDefault();
		login(form as unknown as ILoginRequest);
	};
	const errorText = useMemo(() => getMessageError(error), [error]);
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
					data-testid='test_input-email'
					placeholder='E-mail'
					value={form.email || ''}
					onChange={handleChange}
					extraClass='mb-6'
					type='email'
					name='email'
					error={!!error}
					errorText={errorText}
				/>
				<Input
					data-testid='test_input-password'
					placeholder='Пароль'
					type='password'
					value={form.password || ''}
					onChange={handleChange}
					extraClass='mb-6'
					icon='HideIcon'
					onIconClick={showPassword}
					name='password'
				/>
				<Button
					data-testid='test_button-login'
					htmlType='submit'
					type='primary'
					extraClass='mb-20'>
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
