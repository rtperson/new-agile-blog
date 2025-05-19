module.exports = {
    apps: [
        {
            name: "my-app",
            interpreter: "node",
            script: "./dist/src/server/server.js",
            watch: false,
        },
    ],
};
