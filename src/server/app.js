"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.newApp = void 0;
var express_1 = __importDefault(require("express"));
var helmet_1 = __importDefault(require("helmet"));
var path_1 = __importDefault(require("path"));
var dotenv_1 = __importDefault(require("dotenv"));
var Layout = __importStar(require("../client/Layout"));
dotenv_1.default.config();
var PORT = process.env.PORT;
function newApp() {
    var app = (0, express_1.default)();
    app.set("port", PORT || 3000);
    app.set("views", path_1.default.join(__dirname, "../views"));
    app.set("client", path_1.default.join(__dirname, "../client"));
    app.set("view engine", "ejs");
    app.use((0, helmet_1.default)());
    app.use(helmet_1.default.noSniff());
    app.use(helmet_1.default.contentSecurityPolicy({
        directives: {
            "default-src": ["'self'"],
            "script-src": ["'self'", "example.com"],
            "object-src": ["'none'"],
            "form-action": ["'self'"],
            "frame-ancestors": ["'none'"],
        },
    }));
    app.disable("x-powered-by");
    app.use(express_1.default.static("public"));
    app.get("/", function (_, res) {
        Layout.setLayout(res);
    });
    app.get("/contact", function (_, res) {
        res.render("contact");
    });
    app.use(function (req, res) {
        res.status(404).render("not_found");
    });
    return app;
}
exports.newApp = newApp;
//# sourceMappingURL=app.js.map