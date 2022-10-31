describe('Billboard tests', () => {
    beforeEach('Login to CTco Portal and navigate to Billboard', () => {
        cy.login();
        cy.get('#menu-main-menu').contains('Billboard').click();
    })

    it('should have 5 categories and each category should have appropriate amount of products', () => {
        cy.get('#main-container .product-category').should('have.length', 5)
            .then(categories => {
                cy.wrap(categories).eq(0).find('h2').should('contain', 'Electronics 26 Products')
                cy.wrap(categories).eq(1).find('h2').should('contain', 'Food 4 Products')
                cy.wrap(categories).eq(2).find('h2').should('contain', 'Other 18 Products')
                cy.wrap(categories).eq(3).find('h2').should('contain', 'Real estate 14 Products')
                cy.wrap(categories).eq(4).find('h2').should('contain', 'Transport 20 Products')
            })
    });

    it('should have 20 products inside Transport category', () => {
        cy.get('#main-container .product-category').contains('Transport').click();
        cy.get('.breadcrumb-extra').should('contain', 'Transport');

        cy.assertAllProductCount(20);
    });
});