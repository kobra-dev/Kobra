/// <reference types="cypress"/>

import { username } from "../fixtures/auth-data.json";

describe("Should open the editor and create new project", () => {
    beforeEach(() => {
        cy.visit("/");
    });

    it("Should create new project", () => {
        cy.login();

        cy.get("#username").contains(`Hello, ${username}`).should("exist");

        cy.get("#new-project").click();

        cy.location("origin", { timeout: 10000 }).should(
            "eq",
            "http://localhost:3000/editor"
        );
    });
});
