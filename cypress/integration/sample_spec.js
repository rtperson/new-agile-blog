describe("My First Test", () => {
    it("Does not do much!", () => {
        expect(true).to.equal(true);
    });

    it("Visits the Kitchen Sink", () => {
        cy.visit("https://example.cypress.io");
    });

    it("Can visit the local server", () => {
        cy.visit("http://localhost:8081");
    });

});
