import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import AppHeader from './app-header';
import '@testing-library/jest-dom';

const renderWithRouter = (ui: JSX.Element) => {
	return render(ui, { wrapper: BrowserRouter });
};

describe('Header component', () => {
	afterEach(() => cleanup());

	it('should has nav', () => {
		renderWithRouter(<AppHeader />);
		const navbar = screen.getByTestId('navbar');
		expect(navbar.tagName).toBe('NAV');
	});

	it('should has correct pathname and class', () => {
		renderWithRouter(<AppHeader />);
		const profileLink = screen.getByTestId('test_profile');
		fireEvent.click(profileLink);
		expect(window.location.pathname).toBe('/profile');
		expect(profileLink).toHaveClass('isActive');
		const ordersLink = screen.getByTestId('test_orders');
		fireEvent.click(ordersLink);
		expect(window.location.pathname).toBe('/feed');
		expect(ordersLink).toHaveClass('isActive');
		const homeLink = screen.getByTestId('test_home');
		fireEvent.click(homeLink);
		expect(window.location.pathname).toBe('/');
		expect(homeLink).toHaveClass('isActive');
	});
	it('should be equal to snapshot', () => {
		const { asFragment } = renderWithRouter(<AppHeader />);
		expect(asFragment()).toMatchSnapshot();
	});
});
