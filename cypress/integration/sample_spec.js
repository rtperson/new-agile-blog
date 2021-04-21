describe("My First Test", () => {

    it("Can visit the local server", () => {
        cy.visit("http://localhost:8081");
    });

    it("Should find the title on the homepage", () => {
        cy.visit("http://localhost:8081");
        cy.get("p").should("contain", "Gathering Agility");
    })

});
