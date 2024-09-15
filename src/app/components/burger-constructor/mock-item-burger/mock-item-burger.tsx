import clsx from 'clsx';
import styles from './mock-item-burger.module.scss';
import { LegacyRef, ReactNode } from 'react';

interface MockItemBurgerProps {
	position: 'top' | 'bottom' | 'center';
	children: ReactNode;
	dropTarget?: LegacyRef<HTMLDivElement>;
}

export default function MockItemBurger({
	position,
	children,
	dropTarget,
}: MockItemBurgerProps) {
	return (
		<div
			ref={dropTarget}
			className={clsx(
				styles.container,
				position === 'top'
					? styles.top
					: position === 'bottom'
					? styles.bottom
					: styles.center
			)}>
			{children}
		</div>
	);
}
