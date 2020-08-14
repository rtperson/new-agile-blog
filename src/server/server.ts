import express from "express";
import http from "http";

export class Server {
    app = express();
    port = 8081;
    localServer: http.Server;
    constructor() {
        // define a "hello world" handler for default page
        this.app.get("/", (req, res) => {
            res.render("../views/index.html");
        });

        this.app.get("/contact", (req, res) => {
            res.render("../views/contact.html");
        });

        // define a custom page 404 error
        this.app.use((req, res) => {
            res.status(404).render("../views/not_found.html");
        });
    }

    start(): Promise<any> {
        return new Promise(async () => {
            this.localServer = this.app.listen(this.port);
        });
    }

    stop(): Promise<any> {
        return new Promise(() => {
            if (this.localServer) this.localServer.close();
        });
    }
}
