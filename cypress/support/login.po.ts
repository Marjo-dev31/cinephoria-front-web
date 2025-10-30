export const emailInput = () =>
    cy.get(
        'app-login > div > app-form > div > form > div.flex.flex-col.space-y-2 > input:nth-child(2)',
    );
export const passwordInput = () =>
    cy.get(
        'app-login > div > app-form > div > form > div.flex.flex-col.space-y-2 > input:nth-child(4)',
    );
