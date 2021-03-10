import { newApp } from "./app";
import http from "http";

const app = newApp();
http.createServer({}, app).listen(app.get("port"), () => {
    console.log("listening on port " + app.get("port"));
});
