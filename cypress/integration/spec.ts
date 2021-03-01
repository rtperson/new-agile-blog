describe("TypeScript spec", () => {
    it("works", () => {
        cy.wrap("foo").should("equal", "foo");
    });

    it("loads examples", () => {
        cy.visit("https://example.cypress.io");
        cy.contains("Kitchen Sink");
    });
});
