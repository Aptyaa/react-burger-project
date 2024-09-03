import React, { ReactNode, useEffect, useRef } from 'react';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../modal-overlay/modal-overlay';
import { createPortal } from 'react-dom';
import styles from './modal.module.scss';

interface PropModal {
	header?: string;
	children: ReactNode;
	isOpen: boolean;
	setIsOpen: (ar: boolean) => void;
}

const portal = document.getElementById('portal') as HTMLElement;

export default function Modal({
	header,
	children,
	isOpen,
	setIsOpen,
}: PropModal) {
	const modal = useRef<HTMLDivElement | null>(null);

	const handleClick = () => {
		setIsOpen(false);
	};

	const handleClickOutSide = (e: React.MouseEvent) => {
		if (isOpen && modal.current && !modal.current.contains(e.target as Node)) {
			setIsOpen(false);
		}
	};

	const handlePress = (e: KeyboardEvent) => {
		if (e.key === 'Escape') setIsOpen(false);
	};

	useEffect(() => {
		if (isOpen) document.addEventListener('keydown', handlePress);
		return () => document.removeEventListener('keydown', handlePress);
	}, [isOpen]);

	return (
		isOpen &&
		createPortal(
			<ModalOverlay onClick={handleClickOutSide}>
				<div
					ref={modal}
					className={`${styles.modal} text pt-10 pl-10 pr-10 pb-15`}>
					{header && <p className='text text_type_main-large'>{header}</p>}
					<span className={styles.close}>
						<CloseIcon onClick={handleClick} type='primary' />
					</span>
					{children}
				</div>
			</ModalOverlay>,
			portal
		)
	);
}
