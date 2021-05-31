/// <reference types="cypress" />

describe("Login should work", () => {
    beforeEach(() => {
        cy.visit("https://studio.kobra.dev");
    });

    context("Login modal opens", {});
});
