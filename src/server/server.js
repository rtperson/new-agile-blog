"use strict";
exports.__esModule = true;
var express_1 = require("express");
var Server = /** @class */ (function () {
    function Server() {
        var _this = this;
        this.app = express_1["default"]();
        this.port = 8081;
        // define a "hello world" handler for default page
        this.app.get("/", function (req, res) {
            res.render("./index.html");
        });
        this.app.listen(this.port, function () {
            return console.log("Server class is listening on port " + _this.port);
        });
    }
    return Server;
}());
exports.Server = Server;
