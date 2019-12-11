"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var Server = /** @class */ (function () {
    function Server() {
        this.app = express_1["default"]();
        this.port = 8081;
        // define a "hello world" handler for default page
        this.app.get("/", function (req, res) {
            res.render("./index.html");
        });
        this.start();
    }
    Server.prototype.start = function () {
        var _this = this;
        this.app.listen(this.port, function () {
            console.log("listening on port " + _this.port);
        });
    };
    return Server;
}());
exports.Server = Server;
