import {} from 'cypress';
import '@4tw/cypress-drag-drop';
describe('Application', () => {
	beforeEach(() => {
		cy.visit('http://localhost:8080');
	});
	it('should be constructor burger by default', () => {
		cy.get('[data-testid=test_ingredients]').contains('Соберите бургер');
		cy.get('[data-testid=test_constructor]').contains('Выберите булку');
		cy.get('[data-testid=test_constructor]').contains('Выберите начинку');
		cy.get('[data-name=bun]');
	});
	it('should redirect to home page after success authorization', () => {
		cy.clearAllLocalStorage();
		cy.clearAllCookies();
		const email = 'dshulga92@gmail.com';
		const password = 'q45854585Q';
		cy.visit('http://localhost:8080/login');
		cy.get('[data-testid=test_input-email]').type(`${email}`);
		cy.get('[data-testid=test_input-password]').type(`${password}{enter}`);
		cy.location('pathname').should('eq', '/');
	});
	it('when go to profile it should redirect to login if no authorization', () => {
		cy.clearAllLocalStorage();
		cy.clearAllCookies();
		cy.get('[data-testid=test_profile]').click();
		cy.url().should('include', '/login');
	});
	it('should correct build burger and send order', () => {
		cy.clearAllLocalStorage();
		cy.clearAllCookies();
		cy.intercept('POST', 'https://norma.nomoreparties.space/api/orders').as(
			'orderSend'
		);
		const email = 'dshulga92@gmail.com';
		const password = 'q45854585Q';
		cy.visit('http://localhost:8080/login');
		cy.get('[data-testid=test_input-email]').type(`${email}`);
		cy.get('[data-testid=test_input-password]').type(`${password}{enter}`);
		cy.get('[data-name=bun] [data-testid=test_item]').first().click();
		cy.contains('Детали ингредиента');
		cy.get('[data-testid=test_close-modal-btn]').click();
		cy.get('[data-name=bun] [data-testid=test_item]')
			.first()
			.drag('[data-testid=test_target-bun]');
		cy.get('[data-name=main] [data-testid=test_item]')
			.first()
			.drag('[data-testid=test_target-main]');
		cy.get('[data-name=sauces] [data-testid=test_item]')
			.first()
			.drag('[data-testid=test_target-main]');
		cy.get('[data-testid=test_button-pay]').click();
		cy.wait('@orderSend');
		cy.contains('Ваш заказ начали готовить');
		cy.get('[data-testid=test_close-modal-btn]').click();
		cy.get('[data-testid=test_constructor]').should('be.visible');
	});
});
