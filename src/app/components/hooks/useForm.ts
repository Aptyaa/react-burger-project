import { ChangeEvent, useState } from 'react';

export const useForm = (values: Record<string, string> = {}) => {
	const [form, setForm] = useState(values);

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	return { form, setForm, handleChange };
};
