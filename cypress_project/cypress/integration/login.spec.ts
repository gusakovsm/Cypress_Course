describe('CTco Portal Authorization tests', () => {
    const SUCCESS_LOGIN_MSG = 'Log In Successful';
    const INFO_MSG = 'When you are finished, for security reasons, please Log Out and Exit your web browser.';
    const ERROR_LOGIN_MSG = 'Invalid credentials.';
    const SUCCESS_LOGOUT_MSG = 'Logout successful';
    const LOGOUT_INFO_MSG = 'For security reasons, exit your web browser.';

    beforeEach('Navigate to CAS CTco Portal', () => {
        cy.visit(Cypress.env("baseUrl"));
    });

    it('should login into portal using valid credentials', () => {
        cy.get('input#username').type(Cypress.env("username"));
        cy.get('input#password').type(Cypress.env("password"), {'log': false});
        cy.get('input.btn-submit').click();

        cy.get('.headLabel').should('have.text', SUCCESS_LOGIN_MSG);
        cy.get('.titleLabel').should('have.text', Cypress.env("username"));
        cy.get('.labelFont').should('have.text', INFO_MSG);
        cy.get('input.btn-reset').should('be.visible');
    });

    it('should not login into portal using invalid credentials', () => {
        cy.get('input#username').type(Cypress.env("username"));
        cy.get('input#password').type(Cypress.env("username"));
        cy.get('input.btn-submit').click();

        cy.get('#msg.errors').should('have.text', ERROR_LOGIN_MSG);
    });

    it('should be able to login and logout', () => {
        cy.get('input#username').type(Cypress.env("username"));
        cy.get('input#password').type(Cypress.env("password"), {'log': false});
        cy.get('input.btn-submit').click();

        cy.get('.headLabel').should('have.text', SUCCESS_LOGIN_MSG);

        cy.get('input.btn-reset').click();

        cy.get('#logout h2').should('have.text', SUCCESS_LOGOUT_MSG)
        cy.get('#logout p').should('have.text', LOGOUT_INFO_MSG)
    });
})


