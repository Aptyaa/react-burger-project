import {} from 'cypress';
import '@4tw/cypress-drag-drop';
describe('Application', () => {
	const email = 'test4585@gmail.com';
	const password = 'test4585';
	const constructorBlock = 'test_constructor';

	beforeEach(() => {
		cy.mockApi();
		cy.clearBrowser();
		cy.visit('/');
	});

	it('should be constructor burger by default', () => {
		cy.getByTestId('test_ingredients').contains('Соберите бургер');
		cy.getByTestId(constructorBlock)
			.as('constructorBlock')
			.contains('Выберите булку');
		cy.get('@constructorBlock').contains('Выберите начинку');
	});

	it('should redirect to home page after success authorization', () => {
		cy.login(email, password);
		cy.location('pathname').should('eq', '/');
	});

	it('when go to profile it should redirect to login if no authorization', () => {
		cy.getByTestId('test_profile').click();
		cy.url().should('include', '/login');
	});

	it('should correct build burger and send order', () => {
		cy.login(email, password);
		cy.getByDataAtt({ name: 'bun', testid: 'test_item' })
			.as('bunTestItem')
			.first()
			.click();
		cy.contains('Детали ингредиента');
		cy.getByTestId('test_close-modal-btn').as('closeModal').click();
		cy.dragAndDrop('@bunTestItem', 'test_target-bun');
		cy.getByDataAtt({ name: 'main', testid: 'test_item' })
			.first()
			.as('mainTestItem')
			.dragAndDrop('@mainTestItem', 'test_target-main');
		cy.getByDataAtt({ name: 'sauces', testid: 'test_item' })
			.first()
			.as('draggedSauce')
			.dragAndDrop('@draggedSauce', 'test_target-main');
		cy.getByTestId('test_button-pay').click();
		cy.contains('Ваш заказ начали готовить');
		cy.get('@closeModal').click();
		cy.getByTestId(constructorBlock).should('be.visible');
	});
});
