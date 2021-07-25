describe("Should open the editor and create new project", () => {
    it("Should Sigin", (done) => {
        cy.visit("/");
        cy.get("body").then((body) => {
            cy.wait(100);
            console.log("Hiii");
            cy.get("[type='email']").type("test@cypress.io");
            cy.get("[type='password']").type("cypress");
            cy.contains("LOGIN").click();
            done();
        });
    });
});
