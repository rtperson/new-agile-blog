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

    it("should serve a page", async () => {
        server.start().then(async done => {
            request(server.app)
                .get("/")
                .expect(200)
                .end((err, res) => {
                    if (err) return done(err);
                    done();
                });
        });
    });

    it("should be able to stop the server", () => {
        server.stop().then(async done => {
            request(server.app)
                .get("/")
                .expect(500);
            done();
        });
    });

    afterAll(() => {
        if (server) {
            server.stop().then(async done => {
                done();
            });
        }
    });
});
