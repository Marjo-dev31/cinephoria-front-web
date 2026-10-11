describe('Login Flow', () => {
    beforeEach(() => {
        cy.visit('/login');
    });

    it('should login successfully with valid credentials employee and display right header', () => {
        cy.intercept('POST', '/user/login', {
            fixture: 'employeeUser.json',
        }).as('postLogin');
        cy.get('form input').first().type('employee.user@gmail.com');
        cy.get('form input').eq(1).type('Qsdfghjklm&2');
        cy.get('[data-e2e="submit-form-btn"]').click();
        cy.wait('@postLogin');
        cy.url().should('include', '/backoffice');
        cy.get('[data-e2e="welcome-message"]').should('contain', 'Bienvenue');
        cy.get('[data-e2e="navbar-logout"]').should('contain', 'Déconnexion');
        cy.get('[data-e2e="navbar-intranet"]').should('contain', 'Intranet');
    });
    it('should login successfully with valid credentials admin and display right header', () => {
        cy.intercept('POST', '/user/login', { fixture: 'adminUser.json' }).as(
            'postLogin',
        );
        cy.get('form input').first().type('admin.user@gmail.com');
        cy.get('form input').eq(1).type('Qsdfghjklm&2');
        cy.get('[data-e2e="submit-form-btn"]').click();
        cy.wait('@postLogin');
        cy.url().should('include', '/backoffice');
        cy.get('[data-e2e="welcome-message"]').should('contain', 'Bienvenue');
        cy.get('[data-e2e="navbar-logout"]').should('contain', 'Déconnexion');
        cy.get('[data-e2e="navbar-administration"]').should(
            'contain',
            'Administration',
        );
    });
    it('should login successfully with valid credentials user', () => {
        cy.intercept('POST', '/user/login', { fixture: 'currentUser.json' }).as(
            'postLogin',
        );
        cy.get('form input').first().type('test.user@gmail.com');
        cy.get('form input').eq(1).type('Qsdfghjklm&2');
        cy.get('[data-e2e="submit-form-btn"]').click();
        cy.wait('@postLogin');
        cy.url().should('include', '/myspace');
        cy.get('[data-e2e="navbar-logout"]').should('contain', 'Déconnexion');
        cy.get('[data-e2e="navbar-myspace"]').should('contain', 'Mon Espace');
    });
    it('should display alert message when wrong pattern input', () => {
        cy.get('form input').first().type('test.usergmail.com');
        cy.get('form input').eq(1).type('Qsdfghjklm&');
        cy.get('[data-e2e="submit-form-btn"]').should('be.disabled');
        cy.get('[data-e2e="pattern-pwd-msg"]').should('exist');
        cy.get('[data-e2e="pattern-email-msg"]').should('exist');
    });
    it('should login failed with invalid credentials user', () => {
        cy.intercept('POST', '/user/login', {
            statusCode: 404,
            body: { message: 'Email ou mot de passe invalide' },
        }).as('postLogin');
        cy.get('form input').first().type('test.user@gmail.com');
        cy.get('form input').eq(1).type('Qsdfghjklm&2');
        cy.get('[data-e2e="submit-form-btn"]').click();
        cy.wait('@postLogin');
        cy.get('[data-e2e="error-login-msg"]',{ timeout: 5000 }).should('exist');
    });
});
