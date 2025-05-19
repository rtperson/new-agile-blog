import Ajv from "ajv";

const ajv = new Ajv({ allErrors: true });

describe("AJV Test", () => {
    it("Should validate JSON", () => {
        const schema = {
            type: "object",
            properties: {
                name: { type: "string" },
            },
            required: ["name"],
        };

        const validate = ajv.compile(schema);
        const valid = validate({ name: "Roger" });

        expect(valid).to.be.true;
    });
});

describe("My First Test", () => {
    it("Can visit the local server", () => {
        cy.visit("http://localhost:8081");
    });

    it("Should find the title on the homepage", () => {
        cy.visit("http://localhost:8081");
        cy.get(".title").should("contain", "Gathering Agility");
    });
});
