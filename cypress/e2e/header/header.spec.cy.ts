describe('Header', () => {
    beforeEach(() => {
        cy.visit('/');
        cy.intercept('GET', '/movies', {
            fixture: './movies.json',
        });
    });

    it('should display navbar with logo', () => {
        cy.get('[data-e2e="header-nav"]').should('exist');
        cy.get('[data-e2e="navbar-logo"]').should('exist');
        cy.get('[data-e2e="navbar-movies"]').should('contain', 'Films');
        cy.get('[data-e2e="navbar-reservation"]').should(
            'contain',
            'Réservation',
        );
        cy.get('[data-e2e="navbar-login"]').should('contain', 'Se connecter');
        cy.get('[data-e2e="navbar-contact"]').should('contain', 'Contact');
    });

    it('should navigate on "Films" when click on', () => {
        cy.get('[data-e2e="navbar-movies"]').click();
        cy.url().should('include', '/movies');
    });
    it('should navigate on "Reservation" when click on', () => {
        cy.get('[data-e2e="navbar-reservation"]').click();
        cy.url().should('include', '/reservation');
    });

    it('should navigate on "Se connecter" when click on', () => {
        cy.get('[data-e2e="navbar-login"]').click();
        cy.url().should('include', '/login');
    });
    it('should display burgermenu on mobile', () => {
        cy.viewport('iphone-6');
        cy.get('[data-e2e="header-burgermenu"]').should('exist').click();
        cy.get('[data-e2e="aside-burger"]').should('be.visible');
    });
    it('should navigate on "Se connecter" when click on', () => {
        cy.viewport('iphone-6');
        cy.get('[data-e2e="header-burgermenu"]').should('exist').click();
        cy.get('[data-e2e="aside-login"]').click();
        cy.url().should('include', '/login');
    });
    it('should navigate on "Films" when click on', () => {
        cy.viewport('iphone-6');
        cy.get('[data-e2e="header-burgermenu"]').should('exist').click();
        cy.get('[data-e2e="aside-movies"]').click();
        cy.url().should('include', '/movies');
    });
    it('should navigate on "Réservation" when click on', () => {
        cy.viewport('iphone-6');
        cy.get('[data-e2e="header-burgermenu"]').should('exist').click();
        cy.get('[data-e2e="aside-reservation"]').click();
        cy.url().should('include', '/reservation');
    });
});
