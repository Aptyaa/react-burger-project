import { RefObject, useRef, useState } from 'react';

interface ICurrentTabHookProps {
	rootRef: RefObject<HTMLDivElement>;
	refBun: RefObject<HTMLDivElement>;
	refSauces: RefObject<HTMLDivElement>;
	refMain: RefObject<HTMLDivElement>;
	onScroll: () => void;
	currentTab: string;
}

export const useCurrentTab = (): ICurrentTabHookProps => {
	const [currentTab, setCurrentTab] = useState('buns');
	const rootRef = useRef<HTMLDivElement>(null);
	const refBun = useRef<HTMLDivElement>(null);
	const refSauces = useRef<HTMLDivElement>(null);
	const refMain = useRef<HTMLDivElement>(null);

	const onScroll = () => {
		const rootY = rootRef.current!.getBoundingClientRect().y;
		const bunY = refBun.current!.getBoundingClientRect().y;
		const saucesY = refSauces.current!.getBoundingClientRect().y;
		const mainY = refMain.current!.getBoundingClientRect().y;

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
