"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var http_1 = __importDefault(require("http"));
function default_1() {
    return http_1["default"]
        .createServer(function (req, res) {
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end("Hello World!");
    })
        .listen(8080);
}
exports["default"] = default_1;
