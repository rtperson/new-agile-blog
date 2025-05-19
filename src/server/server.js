"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = require("./app");
var http_1 = __importDefault(require("http"));
var app = (0, app_1.newApp)();
http_1.default.createServer({}, app).listen(app.get("port"), function () {
    console.log("listening on port " + app.get("port"));
});
//# sourceMappingURL=server.js.map