import React, { memo, ReactNode } from 'react';
import styles from './menu-item.module.scss';

interface MenuItemProps {
	icon?: ReactNode;
	children: string;
	value: string;
	onClick: (e: React.MouseEvent<HTMLElement>) => void;
}

function MenuItem(props: MenuItemProps) {
	const { icon, children, value, onClick } = props;
	return (
		<div
			data-value={value}
			className={`${styles.item} p-2 m-4 ml-5 mr-5`}
			onClick={onClick}>
			<span
				className={
					icon
						? 'ml-8 text text_type_main-default'
						: 'text text_type_main-default'
				}>
				<span className={styles.wrapper_icon}>{icon}</span>

				{children}
			</span>
		</div>
	);
}

export default memo(MenuItem);
