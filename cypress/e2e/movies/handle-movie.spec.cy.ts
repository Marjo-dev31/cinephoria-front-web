describe('Movie CRUD, login to logout', () => {
    beforeEach(() => {
        cy.login('employee.user@gmail.com', 'Qsdfghjklm&2');
        cy.get('[data-e2e="sidebarItem"]').eq(2).click();
        cy.intercept('GET', '/movies', {
            fixture: './get-movies.json',
        });
        cy.intercept('GET','/genre', {
          fixture: './get-genre.json'
        })
    });
    it('should display datatable with all movies', () => {
        cy.get('[data-e2e="datatable"]').should('exist');
    });
    it('should display form and add movie on validation', () => {
        cy.intercept('POST', '/movies', {
            fixture: 'post-movie.json',
        }).as('postMovie');
        cy.intercept('POST', '/upload', {
            fixture: 'post-upload.json',
        }).as('postUpload');
        cy.get('[data-e2e="add-movie-btn"]').click();
        cy.get('[data-e2e="add-form"]').should('exist');
        cy.get('form input').first().type('L’Étranger');
        cy.get('form textarea')
            .first()
            .type(
                'Alger, 1938. Meursault, un jeune homme d’une trentaine d’années, modeste employé, enterre sa mère sans manifester la moindre émotion.',
            );
        cy.get('form input').eq(1).type('10');
        cy.get('form select').first().select('drame');
        cy.get('form select').eq(1).select('non');
        cy.get('form input')
            .eq(2)
            .selectFile(Cypress.Buffer.from("l'étranger"));
        cy.get('[data-e2e="submit-form-btn"]').click();
        cy.wait('@postMovie');
        cy.wait('@postUpload');
        cy.get('[data-e2e="add-form"]').should('not.exist');
    });
    it('should display form and update movie on validation', () => {
        cy.intercept('PATCH', '/movies/*', {
            statusCode: 200,
            fixture: 'patch-movie.json',
        }).as('patchMovie');

        cy.get('cdk-row').eq(1).find('button').eq(1).click();
        cy.get('[data-e2e="edit-form"]').should('exist');

        cy.get('form input').eq(1).clear().type('10');

        cy.get('[data-e2e="submit-form-btn"]').click();
        cy.wait('@patchMovie').then((interception) => {
            expect(interception.request.body.minimum_Age).to.eq(10);
        });

        cy.get('[data-e2e="edit-form"]').should('not.exist');
    });
    it('should delete movie when click on trash button', () => {
        cy.intercept('DELETE', '/movies/*', {
            statusCode: 200,
            fixture: 'patch-movie.json',
        }).as('deleteMovie');
        cy.get('cdk-row').should('have.length', 8);
        cy.get('cdk-row').eq(1).find('button').first().click();
        cy.wait('@deleteMovie');
        cy.get('cdk-row').should('have.length', 7);
    });
    it('should disconnect when finish', ()=> {
      cy.get('[data-e2e="navbar-logout"]').click()
      cy.url().should('contain', '/login')
      cy.get('[data-e2e="navbar-logout"]').should('not.exist');
    })
});
