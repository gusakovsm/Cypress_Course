Cypress.Commands.add('login', () => {
    cy.visit(Cypress.env('intranetUrl'));
    cy.get('#username').type(Cypress.env("username"));
    cy.get('#password').type(Cypress.env("password"), {log: false});
    cy.get('.btn-submit').click();
    cy.get('#logo_img').should('be.visible');
});

Cypress.Commands.add('assertAllProductCount', (expectedCount: number) => {
    let productCounter: number = 0;
    const assertProductCount = () => {
        cy.get('.product-loop-inner')
            .its('length')
            .then((itemSize) => {
                productCounter = productCounter + itemSize;
                cy.get('.page-numbers')
                    .then(navigation => {
                        if (navigation.find('.next').length) {
                            cy.wrap(navigation).get('.next').click();
                            assertProductCount();
                        }
                    })
                    .then(() => {
                        cy.wrap(productCounter).should('eq', expectedCount)
                    })
            });
    };
    assertProductCount();
})

declare namespace Cypress {
    interface Chainable {
        login(): Chainable<void>;
        assertAllProductCount(expectedCount: number): Chainable<void>;
    }
};