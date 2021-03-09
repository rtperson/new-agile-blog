import { newApp } from "./app";
import http from "http";

const app = newApp();
const server = http.createServer({}, app);

export function startServer(): number {
    server.listen(app.get("port"), () => {
        console.log("listening on port " + app.get("port"));
    });
    return 0;
}

export function stopServer(): number {
    server.close();
    return 0;
}
