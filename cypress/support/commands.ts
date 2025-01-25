/// <reference types="cypress" />
import '@4tw/cypress-drag-drop';
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

Cypress.Commands.add('mockApi', () => {
	cy.intercept('POST', 'auth/login', { fixture: 'login' });
	cy.intercept('GET', 'ingredients', { fixture: 'ingredients' });
	cy.intercept('GET', 'auth/user', { fixture: 'user' });
	cy.intercept('POST', 'orders', { fixture: 'order' });
});

Cypress.Commands.add('getByTestId', (selector) => {
	return cy.get(`[data-testid=${selector}]`);
});
Cypress.Commands.add('getByDataAtt', (attributes: Record<string, string>) => {
	const selector = Object.entries(attributes)
		.map(([key, value]) => `[data-${key}=${value}]`)
		.join(' ');
	return cy.get(selector);
});
Cypress.Commands.add('clearBrowser', () => {
	cy.clearAllLocalStorage();
	cy.clearAllCookies();
});
Cypress.Commands.add('login', (email: string, password: string) => {
	cy.visit(`login`);
	cy.get('[data-testid=test_input-email]').type(`${email}`);
	cy.get('[data-testid=test_input-password]').type(`${password}{enter}`);
});

Cypress.Commands.add(
	'dragAndDrop',
	(draggedElement: string, targetTestId: string) => {
		return cy.get(draggedElement).drag(`[data-testid=${targetTestId}]`);
	}
);

declare global {
	namespace Cypress {
		interface Chainable {
			mockApi: () => Chainable<void>;
			getByTestId: (selector: string) => Chainable<JQuery<HTMLElement>>;
			getByDataAtt: (
				attributes: Record<string, string>
			) => Chainable<JQuery<HTMLElement>>;
			clearBrowser: () => Chainable<void>;
			login: (email: string, password: string) => Chainable<void>;
			dragAndDrop: (draggableId: string, targetSelector: string) => boolean;
		}
	}
}
