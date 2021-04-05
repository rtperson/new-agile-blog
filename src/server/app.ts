import express from "express";
import { Express } from "express";
import helmet from "helmet";
import path from "path";
import dotenv from "dotenv";

dotenv.config();
const PORT = process.env.PORT;

export function newApp(): Express {
    const app = express();

    app.set("port", PORT || 3000);
    app.set("views", path.join(__dirname, "../views"));
    app.set("client", path.join(__dirname, "../client"));
    app.set("view engine", "ejs");
    app.use(helmet());
    app.use(helmet.noSniff());
    app.use(
        helmet.contentSecurityPolicy({
            directives: {
                "default-src": ["'self'"],
                "script-src": ["'self'", "example.com"],
                "object-src": ["'none'"],
                "form-action": ["'self'"],
                "frame-ancestors": ["'none'"],
            },
        }),
    );

    app.disable("x-powered-by");
    app.use(express.static("public"));

    app.get("/", (_, res: express.Response) => {
        res.render("index");
    });

    app.get("/contact", (_, res: express.Response) => {
        res.render("contact");
    });

    app.use((req, res) => {
        res.status(404).render("not_found");
    });

    return app;
}
