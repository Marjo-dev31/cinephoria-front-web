import { emailInput } from '../../support/login.po';

describe('Login Flow', () => {
    beforeEach(() => {
        cy.visit('/login');
    });

    it('should login successfully with valid credentials', () => {
        cy.intercept('POST', '/user/login', {fixture: 'employeeUser.json' }).as(
            'postLogin',
        );

        cy.get('form input').first().type('nico.riot@gmail.com');
        cy.get('form input').eq(1).type('Azertyuiop&1');
        cy.get('[data-e2e="submit-form-btn"]').click()
        cy.wait('@postLogin');
        cy.url().should('include', '/backoffice');
        cy.get('.welcome-message').should('contain', 'Bienvenue');
    });
});
