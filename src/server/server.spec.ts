import request from "supertest";
import { Express } from "express";
import { newApp } from "./app";

describe("Server", () => {
    let app: Express;

    beforeEach(async () => {
        app = newApp();
    });

    afterEach(async () => {
    });

    it("should be truthy", () => {
        expect(app).toBeTruthy();
    });

    it ("should respond with a 200 response code", () => {
       return request(app)
           .get("/")
           .expect(200);
    });

    it ("should have specific text in its body", async () => {
        const result = await request(app).get("/");
        expect(result.text).toContain("Hello World, from your new Express Server");
    });

    it("should return a 404 error if page not found", async () => {
        const result = await request(app).get("/randompagellkjlkjsfkljl");
        expect(result.status).toEqual(404);
    });

    it("should return a custom 404 page", async () => {
        const result = await request(app).get("/randompagellkjlkjsfkljl");
        expect(result.text).toContain("Sorry, that page cannot be found");
    });

    it("should serve a custom contact page", async () => {
        const result = await request(app).get("/contact");
        expect(result.text).toContain("Hello from your new contact page");
    });

    afterAll(() => {
    });
});
