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

    start(): Promise<any> {
        return new Promise(() => {
            this.localServer = this.app.listen(this.port, async () => {
                //console.log("listening on port " + this.port);  //TODO: figure out best way to start server
            });
        });
    }

    stop(): Promise<any> {
        return new Promise(() => {
            if (this.localServer) this.localServer.close();
        });
    }
}
