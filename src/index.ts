import { Server } from "./server/server";

const server = new Server();
server.start().then(async done => {
    done();
});
