import { newApp } from "./app";
import http from "http";

const app = newApp();
const server = http.createServer({}, app).listen(app.get("port"), () => {
    console.log("listening on port " + app.get("port"));
});

export function stopServer(): number {
    server.close();
    return 0;
}
