import AppHeader from './components/app-header/app-header';
import BurgerIngredients from './components/burger-ingredients/burger-ingredients';
import BurgerConstructor from './components/burger-constructor/burger-constructor';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import styles from './app.module.scss';

export const App = () => {
	return (
		<>
			<AppHeader />
			<main className={styles.page}>
				<div className={styles.container}>
					<DndProvider backend={HTML5Backend}>
						<BurgerIngredients />
						<BurgerConstructor />
					</DndProvider>
				</div>
			</main>
		</>
	);
};
