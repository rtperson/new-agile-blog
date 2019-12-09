var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Server } from "./server";
import request from "supertest";
describe("Server", () => {
    let server;
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        server = new Server();
    }));
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
//# sourceMappingURL=server.spec.js.map