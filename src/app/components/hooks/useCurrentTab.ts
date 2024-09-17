import { useRef, useState } from 'react';

export const useCurrentTab = () => {
	const [currentTab, setCurrentTab] = useState('buns');
	const rootRef = useRef(null);
	const refBun = useRef(null);
	const refSauces = useRef(null);
	const refMain = useRef(null);

	const onScroll = () => {
		const rootY = (
			rootRef.current as unknown as Element
		).getBoundingClientRect().y;
		const bunY = (refBun.current as unknown as Element).getBoundingClientRect()
			.y;
		const saucesY = (
			refSauces.current as unknown as Element
		).getBoundingClientRect().y;
		const mainY = (
			refMain.current as unknown as Element
		).getBoundingClientRect().y;

		setCurrentTab(
			Math.abs(bunY - rootY) < Math.abs(saucesY - rootY)
				? 'buns'
				: Math.abs(saucesY - rootY) < Math.abs(mainY - rootY)
				? 'sauces'
				: 'main'
		);
	};
	return {
		rootRef,
		refBun,
		refSauces,
		refMain,
		onScroll,
		currentTab,
	};
};
