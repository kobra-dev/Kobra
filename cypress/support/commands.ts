// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

Cypress.Commands.add("login", () => {
    cy.get("[type='email']").type("test@cypress.io");
    cy.get("[type='password']").type("cypress");
    cy.contains("LOGIN").click();
});
