import { Server } from "./server";
import request from "supertest";

describe("Server", () => {
    let server: Server;

    beforeEach(async () => {
        server = new Server();
    });

    afterEach(() => {});

    it("should be truthy", () => {
        expect(server).toBeTruthy();
    });

    it("should serve a page", () => {
        server.start();
        request(server.app)
            .get("/")
            .expect(200);
    });

    it("should be able to stop the server", () => {
        server.stop();
        request(server.app)
            .get("/")
            .expect(500);
    });
});
