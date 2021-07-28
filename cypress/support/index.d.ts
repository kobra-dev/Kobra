// load type definitions that come with Cypress module
// eslint-disable-next-line spaced-comment
/// <reference types="cypress" />

declare namespace Cypress {
    interface Chainable {
        login(): void;
    }
}
