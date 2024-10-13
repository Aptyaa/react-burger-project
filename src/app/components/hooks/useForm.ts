import { ChangeEvent, useState } from 'react';

interface IFormResultReturn<T> {
	form: T;
	setForm: React.Dispatch<T>;
	handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const useForm = <T>(values: T): IFormResultReturn<T> => {
	const [form, setForm] = useState<T>(values);

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	return { form, setForm, handleChange };
};
