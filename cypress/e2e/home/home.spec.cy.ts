describe('Home component', () => {
    beforeEach(() => {});
    it('should visits the initial project page and display hero title', () => {
        cy.visit('/');
        cy.get('[data-e2e="herotitle"]').should('contain', 'Cinéphoria');
    });
    it('should display carousel if at least one movie was created since last wednesday', () => {
        const fixedDate = new Date(2025, 9, 30);
        cy.clock(fixedDate.getTime());
        cy.visit('/');
        cy.intercept('GET', '/movies', {
            fixture: './movies.json',
        });
        cy.get('[data-e2e="carousel"]').should('exist');
        cy.get('[data-e2e="empty-lastMovies"]').should('not.exist');
    });
    it('should display message if no movie was created since last wednesday', () => {
        const fixedDate = new Date(2025, 12, 30);
        cy.clock(fixedDate.getTime());
        cy.visit('/');
        cy.intercept('GET', '/movies', { body: [] });
        cy.get('[data-e2e="carousel"]').should('not.exist');
        cy.get('[data-e2e="empty-lastMovies"]').should('exist');
    });
});
