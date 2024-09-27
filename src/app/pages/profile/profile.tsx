import {
	Button,
	Input,
} from '@ya.praktikum/react-developer-burger-ui-components';
import React, { useEffect, useState } from 'react';
import styles from './profile.module.scss';
import Navigation from './navigation/navigation';
import { useGetUserQuery, useUpdateUserMutation } from '../../services/app-api';
import Loader from '../../components/loader/loader';
import clsx from 'clsx';

const initialDisabledState = {
	name: true,
	password: true,
	email: true,
};

export default function Profile() {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [allow, setAllow] = useState(initialDisabledState);
	const { data, isLoading } = useGetUserQuery();
	const [updateUser, { data: updateUserData, isLoading: isLoadingUpdateUser }] =
		useUpdateUserMutation();

	useEffect(() => {
		setName(data?.user.name || '');
		setEmail(data?.user.email || '');
	}, [data]);

	const handleSubmit = async (e: React.SyntheticEvent) => {
		e.preventDefault();
		await updateUser({ name, email, password });
		setAllow(initialDisabledState);
		setName(data?.user.name || '');
		setEmail(data?.user.email || '');
	};

	const cancelUpdate = () => {
		setName(updateUserData?.user.name || data?.user.name || '');
		setEmail(updateUserData?.user.email || data?.user.email || '');
		setPassword('');
	};

	const allowUpdate = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		setAllow({
			...allow,
			[(e.currentTarget.previousElementSibling as HTMLInputElement).name]:
				!allow[
					(e.currentTarget.previousElementSibling as HTMLInputElement)
						.name as keyof typeof initialDisabledState
				],
		});
	};
	return (
		<section className={styles.container}>
			<Navigation />
			{isLoading || isLoadingUpdateUser ? (
				<Loader />
			) : (
				<form onSubmit={handleSubmit}>
					<Input
						extraClass={clsx('mb-6', styles.inactive_input)}
						value={name || ''}
						placeholder='Имя'
						onChange={(e) => setName(e.target.value)}
						icon='EditIcon'
						onIconClick={allowUpdate}
						disabled={allow.name}
						name='name'
					/>
					<Input
						extraClass='mb-6'
						value={email || ''}
						placeholder='Email'
						onChange={(e) => setEmail(e.target.value)}
						icon='EditIcon'
						onIconClick={allowUpdate}
						disabled={allow.email}
						name='email'
					/>
					<Input
						extraClass='mb-6'
						value={password || ''}
						type='password'
						placeholder='Пароль'
						onChange={(e) => setPassword(e.target.value)}
						icon='EditIcon'
						onIconClick={allowUpdate}
						disabled={true}
						name='password'
					/>
					<div className={styles.button_wrapper}>
						<Button
							color='secondary'
							type='secondary'
							onClick={cancelUpdate}
							htmlType='button'>
							Отмена
						</Button>
						<Button htmlType='submit'>Сохранить</Button>
					</div>
				</form>
			)}
		</section>
	);
}
