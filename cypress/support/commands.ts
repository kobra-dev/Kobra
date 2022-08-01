// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

/// <reference types="cypress" />

import { email, password } from "../fixtures/auth-data.json";

Cypress.Commands.add("login", () => {
    cy.clearCookies();

    cy.clearLocalStorage().then(() => {
        indexedDB.deleteDatabase("firebaseLocalStorageDb");
    });

    cy.get("#email").type(email);
    cy.get("#password").type(password);
    cy.get("#action").contains("Login").click();

    cy.location("origin", { timeout: 10000 }).should(
        "eq",
        "http://localhost:3000"
    );
});
