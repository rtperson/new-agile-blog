import { Server } from "./server";

describe('Server', () => {
    let server: Server;

    beforeEach(async () => {
        server = new Server();
    });

   it('should be truthy', () => {
       expect(server).toBeTruthy();
   });
});
