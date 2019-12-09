import express from "express";

export class Server {
    app = express();
    port = 8081;
    constructor() {
        // define a "hello world" handler for default page
        this.app.get("/", (req, res) => {
            res.render("./index.html");
        });
    }

    start() {
        this.app.listen(this.port, () => {
            console.log("listening on port " + this.port);
        });
    }

    stop() {
        
    }
}
