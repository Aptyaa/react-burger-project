import AppHeader from './components/app-header/app-header';
import Login from './pages/login/login';
import styles from './app.module.scss';
import Registration from './pages/registration/registration';
import Error404 from './pages/error404/error';
import Profile from './pages/profile/profile';
import Home from './pages/home/home';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import ForgotPassword from './pages/forgot-password/forgot-password';
import ResetPassword from './pages/reset-password/reset-password';
import {
	OnlyAuth,
	OnlyUnAuth,
} from './components/protected-route-element/protected-route-element';
import Modal from './components/modal/modal';
import IngredientDetails from './components/modal/ingredient-details/ingredient-details';
import Orders from './pages/orders/orders';
import OrderIngredients from './components/modal/order-ingredients/order-ingredients';
import Form from './pages/profile/form/form';
import Feed from './components/feed/feed';

export const App = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const background = location.state && location.state.background;
	const handleModalClose = () => {
		navigate(-1);
	};
	return (
		<>
			<AppHeader />
			{background && (
				<Routes>
					<Route
						path='ingredients/:ingredientId'
						element={
							<Modal header='Детали ингредиента' closeModal={handleModalClose}>
								<IngredientDetails />
							</Modal>
						}
					/>
					<Route
						path='/feed/:number'
						element={
							<Modal closeModal={handleModalClose}>
								<OrderIngredients />
							</Modal>
						}
					/>
					<Route
						path='profile/orders/:number'
						element={
							<OnlyAuth
								component={
									<Modal closeModal={handleModalClose}>
										<OrderIngredients />
									</Modal>
								}
							/>
						}
					/>
				</Routes>
			)}
			<main className={styles.page}>
				<Routes location={background || location}>
					<Route path='/' element={<Home />} />
					<Route path='/login' element={<OnlyUnAuth component={<Login />} />} />
					<Route
						path='/register'
						element={<OnlyUnAuth component={<Registration />} />}
					/>
					<Route
						path='/forgot-password'
						element={<OnlyUnAuth component={<ForgotPassword />} />}
					/>
					<Route
						path='/reset-password'
						element={<OnlyUnAuth component={<ResetPassword />} />}
					/>
					<Route path='/profile' element={<OnlyAuth component={<Profile />} />}>
						<Route index element={<Form />} />
						<Route path='orders' element={<Feed variant='history_orders' />} />
					</Route>
					<Route
						path='profile/orders/:number'
						element={<OnlyAuth component={<OrderIngredients />} />}
					/>
					<Route
						path='/ingredients/:ingredientId'
						element={<IngredientDetails />}
					/>
					<Route path='feed' element={<Orders />} />
					<Route path='feed/:number' element={<OrderIngredients />} />

					<Route path='*' element={<Error404 />} />
				</Routes>
			</main>
		</>
	);
};
