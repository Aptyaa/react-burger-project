import {
	Button,
	Input,
} from '@ya.praktikum/react-developer-burger-ui-components';
import clsx from 'clsx';
import styles from './form.module.scss';
import { useForm } from '../../../components/hooks/useForm';
import { useEffect, useState } from 'react';
import {
	useGetUserQuery,
	useUpdateUserMutation,
} from '../../../services/app-api';
import Loader from '../../../components/loader/loader';
import { IUpdateUser } from '../../../types';

const initialDisabledState = {
	name: true,
	password: true,
	email: true,
};

function Form() {
	const { form, handleChange, setForm } = useForm({
		name: '',
		password: '',
		email: '',
	});
	const [allow, setAllow] = useState(initialDisabledState);
	const { data, isLoading } = useGetUserQuery();
	const [updateUser, { isLoading: isLoadingUpdateUser }] =
		useUpdateUserMutation();
	useEffect(() => {
		setForm({
			...form,
			name: data?.user.name || '',
			email: data?.user.email || '',
		});
	}, [data]);

	const handleSubmit = async (e: React.SyntheticEvent) => {
		e.preventDefault();
		await updateUser(form as unknown as IUpdateUser);
		setAllow(initialDisabledState);
		setForm({ ...form, name: data?.user.name || '' });
		setForm({ ...form, email: data?.user.email || '' });
	};

	const cancelUpdate = () => {
		setForm({ ...form, name: data?.user.name || '' });
		setForm({ ...form, email: data?.user.email || '' });
		setForm({ ...form, password: '' });
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
	if (isLoading || isLoadingUpdateUser) return <Loader />;
	return (
		<form className={styles.form} onSubmit={handleSubmit}>
			<Input
				extraClass={clsx('mb-6', styles.inactive_input)}
				value={form.name || ''}
				placeholder='Имя'
				onChange={handleChange}
				icon='EditIcon'
				onIconClick={allowUpdate}
				disabled={allow.name}
				name='name'
			/>
			<Input
				extraClass='mb-6'
				value={form.email || ''}
				placeholder='Email'
				onChange={handleChange}
				icon='EditIcon'
				onIconClick={allowUpdate}
				disabled={allow.email}
				name='email'
			/>
			<Input
				extraClass='mb-6'
				value={form.password || ''}
				type='password'
				placeholder='Пароль'
				onChange={handleChange}
				icon='EditIcon'
				onIconClick={allowUpdate}
				disabled={allow.password}
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
	);
}

export default Form;
