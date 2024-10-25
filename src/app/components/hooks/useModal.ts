import { useCallback, useState } from 'react';

interface IModalHookProps {
	modalIsOpen: boolean;
	openModal: () => void;
	closeModal: () => void;
}

export const useModal = (): IModalHookProps => {
	const [modalIsOpen, setModalIsOpen] = useState(false);

	const openModal = useCallback(() => setModalIsOpen(true), []);

	const closeModal = useCallback(() => {
		setModalIsOpen(false);
	}, []);

	return { modalIsOpen, openModal, closeModal };
};
