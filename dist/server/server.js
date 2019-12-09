import express from "express";
export class Server {
    constructor() {
        this.app = express();
        this.port = 8081;
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
}
//# sourceMappingURL=server.js.map