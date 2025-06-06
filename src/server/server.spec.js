"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var supertest_1 = __importDefault(require("supertest"));
var app_1 = require("./app");
describe("Server", function () {
    var app;
    var server, agent;
    beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    app = (0, app_1.newApp)();
                    return [4 /*yield*/, new Promise(function (resolve) {
                            server = app.listen(4000, function () {
                                agent = supertest_1.default.agent(server); // since the application is already listening, it should use the allocated port
                                resolve();
                            });
                        })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    afterEach(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!server) return [3 /*break*/, 2];
                    return [4 /*yield*/, new Promise(function (resolve, reject) {
                            server.close(function (err) { return (err ? reject(err) : resolve()); });
                        })];
                case 1:
                    _a.sent();
                    _a.label = 2;
                case 2: return [2 /*return*/];
            }
        });
    }); });
    it("should be truthy", function () {
        expect(app).toBeTruthy();
    });
    it("should be listening on defined port", function () {
        var port = app.get("port");
        expect(port).toEqual("8081");
    });
    it("should respond with a 200 response code", function () {
        return agent.get("/").expect(200);
    });
    it("should have specific text in its body", function () { return __awaiter(void 0, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, agent.get("/")];
                case 1:
                    result = _a.sent();
                    expect(result.text).toContain("Hello World, from your new Express Server");
                    return [2 /*return*/];
            }
        });
    }); });
    it("should return a 404 error if page not found", function () { return __awaiter(void 0, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, agent.get("/randompagellkjlkjsfkljl")];
                case 1:
                    result = _a.sent();
                    expect(result.status).toEqual(404);
                    return [2 /*return*/];
            }
        });
    }); });
    it("should return a custom 404 page", function () { return __awaiter(void 0, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, agent.get("/randompagellkjlkjsfkljl")];
                case 1:
                    result = _a.sent();
                    expect(result.text).toContain("Sorry, that page cannot be found");
                    return [2 /*return*/];
            }
        });
    }); });
    it("should serve a custom contact page", function () { return __awaiter(void 0, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, agent.get("/contact")];
                case 1:
                    result = _a.sent();
                    expect(result.text).toContain("Hello from your new contact page");
                    return [2 /*return*/];
            }
        });
    }); });
    it("should not serve an X-Powered-By Header", function () { return __awaiter(void 0, void 0, void 0, function () {
        var result, poweredByHeader;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, agent.get("/")];
                case 1:
                    result = _a.sent();
                    poweredByHeader = result.header["x-powered-by"];
                    expect(poweredByHeader).toBeFalsy();
                    return [2 /*return*/];
            }
        });
    }); });
    it("should serve an X-Frame-Options header set to DENY", function () { return __awaiter(void 0, void 0, void 0, function () {
        var result, corsHeader;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, agent.get("/")];
                case 1:
                    result = _a.sent();
                    corsHeader = result.header["x-frame-options"];
                    expect(corsHeader).toContain("SAMEORIGIN");
                    return [2 /*return*/];
            }
        });
    }); });
    it("should have a header section", function () { return __awaiter(void 0, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, agent.get("/")];
                case 1:
                    result = _a.sent();
                    expect(result.text).toContain("Hi! Header section");
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=server.spec.js.map