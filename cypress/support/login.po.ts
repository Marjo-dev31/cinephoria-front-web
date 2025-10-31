export const emailInput = () =>
    cy.get(
        'app-login > div > app-form > div > form > div.flex.flex-col.space-y-2 > input:nth-child(2)',
    );
export const passwordInput = () =>
    cy.get(
        'app-login > div > app-form > div > form > div.flex.flex-col.space-y-2 > input:nth-child(4)',
    );
export const editBtn = () => {
            'body > app-root > main > app-backoffice > app-moviebackoffice > div > app-datatable > section > cdk-table > cdk-row:nth-child(2) > cdk-cell.cdk-cell.flex-1.p-2.text-center.flex.flex-col.md\:flex-row.justify-evenly.cdk-column-action > button:nth-child(2)'
    cy.get('')
}

