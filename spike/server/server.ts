import express from "express";

const app = express();

app.get("/", (req, res) => {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end("Hello World!");
});

app.listen(8080, () => {
    console.log("listening on port 8080");
});
