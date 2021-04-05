import request from "supertest";
import { Express } from "express";
import { newApp } from "./app";
import http from "http";

describe("Server", () => {
    let app: Express;
    let server: http.Server, agent: request.SuperTest<request.Test>;

    beforeEach((done) => {
        app = newApp();
        server = app.listen(4000, () => {
            // if (err) return done(err);

            agent = request.agent(server); // since the application is already listening, it should use the allocated port
            done();
        });
    });

    afterEach((done) => {
        return server && server.close(done);
    });

    it("should be truthy", () => {
        expect(app).toBeTruthy();
    });

    it("should be listening on defined port", () => {
        const port = app.get("port");
        expect(port).toEqual("8081");
    });

    it("should respond with a 200 response code", () => {
        return agent.get("/").expect(200);
    });

    it("should have specific text in its body", async () => {
        const result = await agent.get("/");
        expect(result.text).toContain("Hello World, from your new Express Server");
    });

    it("should return a 404 error if page not found", async () => {
        const result = await agent.get("/randompagellkjlkjsfkljl");
        expect(result.status).toEqual(404);
    });

    it("should return a custom 404 page", async () => {
        const result = await agent.get("/randompagellkjlkjsfkljl");
        expect(result.text).toContain("Sorry, that page cannot be found");
    });

    it("should serve a custom contact page", async () => {
        const result = await agent.get("/contact");
        expect(result.text).toContain("Hello from your new contact page");
    });

    it("should not serve an X-Powered-By Header", async () => {
        const result = await agent.get("/");
        const poweredByHeader = result.header["x-powered-by"];
        expect(poweredByHeader).toBeFalsy();
    });

    it("should serve an X-Frame-Options header set to DENY", async () => {
        const result = await agent.get("/");
        const corsHeader = result.header["x-frame-options"];
        expect(corsHeader).toContain("SAMEORIGIN");
    });
});
