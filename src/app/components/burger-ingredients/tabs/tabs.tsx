import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './tabs.module.scss';
import { memo } from 'react';

interface TabsProps {
	currentTab: string;
	refBun: React.RefObject<HTMLDivElement>;
	refSauces: React.RefObject<HTMLDivElement>;
	refMain: React.RefObject<HTMLDivElement>;
}

function Tabs({ currentTab, refBun, refSauces, refMain }: TabsProps) {
	return (
		<div>
			<div className={`${styles.tab_ingredients}`}>
				<Tab
					value='buns'
					active={currentTab === 'buns'}
					onClick={() =>
						(refBun.current as unknown as Element).scrollIntoView({
							behavior: 'smooth',
						})
					}>
					Булки
				</Tab>
				<Tab
					value='sauces'
					active={currentTab === 'sauces'}
					onClick={() =>
						(refSauces.current as unknown as Element).scrollIntoView({
							behavior: 'smooth',
						})
					}>
					Соусы
				</Tab>
				<Tab
					value='main'
					active={currentTab === 'main'}
					onClick={() =>
						(refMain.current as unknown as Element).scrollIntoView({
							behavior: 'smooth',
						})
					}>
					Начинки
				</Tab>
			</div>
		</div>
	);
}

export default memo(Tabs);
