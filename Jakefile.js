/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-use-before-define */

const { task, desc } = require("jake");
const fileList = require("filelist");
const rmfr = require("rmfr");
const NODE_VERSION = "v14.15.0";
const cy = require("cypress");

desc("This is the default task");
task("default", ["lint", "nodeVersion", "compile-ts", "test-server", "test-client"]);

desc("Cleans all build files");
task("clean", [], () => {
    (async () => await rmfr("dist"))().then(() => {
        console.log("build files deleted");
    });
});

desc("lint all Typescript files");
task(
    "lint",
    async function () {
        const cmd = ["eslint"].concat(getSourceFileServerList()).join(" ");
        jake.exec(
            cmd,
            () => {
                console.log("all files linted");
            },
            { printStderr: true, printStdout: true },
        );
    },
    true,
);

desc("This is the TypeScript compilation task");
task(
    "compile-ts",
    async function () {
        const cmd = "tsc";
        console.log(cmd);
        jake.exec(
            cmd,
            () => {
                console.log("typescript compilation completed");
            },
            { printStderr: true, printStdout: true },
        );
    },
    true,
);

desc("run all server-side tests");
task(
    "test-server",
    ["lint", "nodeVersion", "compile-ts"],
    async () => {
        jake.exec(
            "jest --detectOpenHandles --forceExit --coverage",
            () => {
                console.log("server tests completed");
            },
            { printStderr: true, printStdout: true },
        );
    },
    true,
);

desc("start-server");
task("start-server", ["lint", "nodeVersion", "compile-ts"], async () => {
    jake.exec(
        "npx ts-node -e 'require(\"./src/server/server.ts\").startServer()'",
        () => {
            console.log("server started from jake");
        },
        {
            printStderr: true,
            printStdout: true,
        },
    );
});

desc("run all client-side tests");
task(
    "test-client",
    ["lint", "nodeVersion", "compile-ts", "start-server"],
    async () => {
        await cy
            .run({
                reporter: "junit",
                browser: "chrome",
                config: {
                    baseUrl: "http://localhost:8081",
                    video: false,
                },
            })
            .then(() => {
                cy.run({
                    reporter: "junit",
                    browser: "firefox",
                    config: {
                        baseUrl: "http://localhost:8081",
                        video: false,
                    },
                }).then(() => {
                    jake.exec(
                        "npx ts-node -e 'require(\"./src/server/server.ts\").stopServer()'",
                        () => {
                            console.log("server stopped from jake");
                            process.exit();
                        },
                        {
                            printStderr: true,
                            printStdout: true,
                        },
                    );
                });
            });
    },
    true,
);

desc("Integrate");
task("integrate", ["default"], function () {
    console.log("1. Make sure 'git status' is clean.");
    console.log("2. Build on the integration box.");
    console.log("   a. Walk over to integration box.");
    console.log("   b. 'git pull'");
    console.log("   c. 'jake'");
    console.log("   d. If jake fails, stop! Try again after fixing the issue.");
    console.log("3. 'git checkout integration'");
    console.log("4. 'git merge master --no-ff --log'");
    console.log("5. 'git checkout master'");
});

desc("Ensure correct version of Node is present. Use 'strict=true' to require exact match");
task("nodeVersion", [], function () {
    function failWithQualifier(qualifier) {
        fail(
            "Incorrect node version. Expected " +
                qualifier +
                " [" +
                expectedString +
                "], but was [" +
                actualString +
                "].",
        );
    }

    const expectedString = NODE_VERSION;
    const actualString = process.version;
    const expected = parseNodeVersion("expected Node version", expectedString);
    const actual = parseNodeVersion("Node version", actualString);

    if (actual[0] !== expected[0] || actual[1] !== expected[1] || actual[2] !== expected[2]) {
        failWithQualifier("exactly");
    }
});

function parseNodeVersion(description, versionString) {
    const versionMatcher = /^v(\d+)\.(\d+)\.(\d+)$/; // v[major].[minor].[bugfix]
    const versionInfo = versionString.match(versionMatcher);
    if (versionInfo === null) {
        fail("Could not parse " + description + " (was '" + versionString + "')");
    }

    const major = parseInt(versionInfo[1], 10);
    const minor = parseInt(versionInfo[2], 10);
    const bugfix = parseInt(versionInfo[3], 10);
    return [major, minor, bugfix];
}

function getSourceFileServerList() {
    const files = new fileList.FileList();
    files.include("src/**/*.ts");
    files.include("cypress/**/*.ts");
    // files.exclude("src/**/*.spec.ts");
    files.exclude("node_modules");
    return files.toArray();
}
