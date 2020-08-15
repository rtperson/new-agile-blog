import express from "express";
import { Express } from "express";
import path from "path";

const PORT = 8081;

export function newApp(): Express {
    const app = express();

    app.set("port", PORT || 3000);
    app.set("views", path.join(__dirname, "../views"));
    app.set("view engine", "ejs");

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
