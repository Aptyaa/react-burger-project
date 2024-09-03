import React, { ReactNode } from 'react';
import styles from './modal-overlay.module.scss';

interface ModalOverlayProp {
	children: ReactNode;
	onClick: (e: React.MouseEvent) => void;
}

function ModalOverlay({ children, onClick }: ModalOverlayProp) {
	return (
		<div onClick={onClick} className={styles.overlay}>
			{children}
		</div>
	);
}

export default ModalOverlay;
