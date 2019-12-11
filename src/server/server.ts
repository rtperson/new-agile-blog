import express from "express";
import http from "http";

export class Server {
    app = express();
    port = 8081;
    localServer: http.Server;
    constructor() {
        // define a "hello world" handler for default page
        this.app.get("/", (req, res) => {
            res.render("./index.html");
        });
    }

    start(): void {
        this.localServer = this.app.listen(this.port, () => {
            console.log("listening on port " + this.port);
        });
    }

    stop(): void {
        if (this.localServer) this.localServer.close();
    }
}
