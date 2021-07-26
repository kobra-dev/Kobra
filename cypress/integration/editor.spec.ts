/// <reference types="cypress"/>

import { username } from "../fixtures/auth-data.json";

describe("Should open the editor and create new project", () => {
    beforeEach(() => {
        cy.visit("/");
    });

    it("Should create new project", () => {
        cy.login();

        cy.get("#username", { timeout: 10000 })
            .contains(`Hello, ${username}`)
            .should("exist");

        cy.get("#new-project").click();

        cy.location("pathname", { timeout: 10000 }).should("eq", "/editor");

        cy.get("#newProjectTitle", { timeout: 10000 })
            .contains("Unsaved project")
            .should("exist")
            .click()
            .then((e) => {
                cy.get("#newProjectInput").clear().type("Test Project");
            });

        cy.get("#saveBtn").click();
    });
});
