import AppHeader from './components/app-header/app-header';
import BurgerIngredients from './components/burger-ingredients/burger-ingredients';
import BurgerConstructor from './components/burger-constructor/burger-constructor';
import { useEffect, useState } from 'react';
import { IngredientsProp } from './const';
import styles from './app.module.scss';

interface StateProps {
	ingredients: IngredientsProp[] | [];
	isLoading: boolean;
	error: boolean;
}

const API_URL = 'https://norma.nomoreparties.space/api/ingredients';

const initialState: StateProps = {
	ingredients: [],
	isLoading: false,
	error: false,
};

export const App = () => {
	const [state, setState] = useState<StateProps>(initialState);

	useEffect(() => {
		(async () => {
			try {
				setState({ ...state, isLoading: true, error: false });
				const res = await fetch(API_URL);
				if (res.ok) {
					const { data } = await res.json();
					setState({ ingredients: data, isLoading: false, error: false });
				}
			} catch {
				console.log('Something wrong ...');
				setState({ ...state, isLoading: false, error: true });
			}
		})();
	}, []);

	return (
		<>
			<AppHeader />
			<main className={styles.page}>
				<div style={{ display: 'flex', gap: '40px' }}>
					<BurgerIngredients ingredients={state.ingredients} />
					<BurgerConstructor ingredients={state.ingredients} />
					{/* <PopupItemBurger /> */}
					{/* <ModalOverlay /> */}
				</div>
			</main>
		</>
	);
};
