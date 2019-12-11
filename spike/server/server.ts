import express from "express";

const app = express();

app.get("/", (req, res) => {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end("Hello World!");
});

app.listen(8080, () => {
    console.log("listening on port 8080");
});

// import { IncomingMessage, ServerResponse } from "http";
//
// import * as http from "http";
// http.createServer((req: IncomingMessage, res: ServerResponse) => {
//     res.writeHead(200, { "Content-Type": "text/plain" });
//     res.end("Hello World!");
// }).listen(8080);
