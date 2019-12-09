import { Server } from "./server";
import request from "supertest";

describe("Server", () => {
    let server: Server;

    beforeEach(async () => {
        server = new Server();
    });

    afterEach(() => {

    });

    it("should be truthy", () => {
        expect(server).toBeTruthy();
    });

    it("should serve a page", () => {
        server.start();
        return request(server.app).get("/").expect(200);
    });
});
