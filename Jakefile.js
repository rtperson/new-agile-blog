/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-use-before-define */

const { task, desc } = require("jake");
const fileList = require("filelist");
const rmfr = require("rmfr");
//const NODE_VERSION = "v14.15.0";
const NODE_VERSION = "v20.11.1";
const cy = require("cypress");

desc("This is the default task");
task("default", ["lint", "nodeVersion", "compile-ts", "build-styles", "test-server"]); //, "test-client"]);

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
        return new Promise((resolve) => {
            const cmd = ["eslint"].concat(getSourceFileServerList()).join(" ");
            jake.exec(
                cmd,
                () => {
                    console.log("all files linted");
                    resolve();
                },
                { printStderr: true, printStdout: true },
            );
        });
    },
    true,
);

desc("This is the TypeScript compilation task");
task(
    "compile-ts",
    async function () {
        return new Promise((resolve) => {
            const cmd = "tsc";
            console.log(cmd);
            jake.exec(
                cmd,
                () => {
                    console.log("typescript compilation completed");
                },
                { printStderr: true, printStdout: true },
            );
            resolve();
        });
    },
    true,
);

desc("create CSS styles -- vanilla Tailwind right now");
task(
    "build-styles",
    ["lint", "nodeVersion", "compile-ts"],
    async () => {
        return new Promise((resolve) => {
            jake.exec(
                "tailwind build src/style/style.css -o public/css/tailwind.css",
                () => {
                    console.log("CSS Styles compiled");
                },
                { printStderr: true, printStdout: true },
            );
            resolve();
        });
    },
    true,
);

desc("run all server-side tests");
task(
    "test-server",
    ["lint", "nodeVersion", "compile-ts", "build-styles"],
    async () => {
        return new Promise((resolve) => {
            jake.exec(
                "jest --detectOpenHandles --forceExit --coverage",
                () => {
                    console.log("server tests completed");
                },
                { printStderr: true, printStdout: true },
            );
            resolve();
        });
    },
    true,
);

desc("start-server");
task("start-server", ["lint", "nodeVersion", "compile-ts", "build-styles"], async () => {
    jake.exec(
        "forever start -c ts-node ./src/server/server.ts",
        () => {
            console.log("server started from jake");
        },
        {
            printStderr: true,
            printStdout: true,
        },
    );
});

desc("stop server without running client-side tests");
task("stop-server", [], async () => {
    jake.exec(
        "forever stop -c ts-node ./src/server/server.ts",
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

desc("stop and start server");
task("cycle-server", [], async () => {
    jake.exec(
        "forever restart -c ts-node ./src/server/server.ts",
        () => {
            console.log("server restarted from jake");
            process.exit();
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
    ["lint", "nodeVersion", "compile-ts", "build-styles", "start-server"],
    async () => {
        return new Promise(
            () => {
                cy.run({
                    reporter: "junit",
                    browser: "chrome",
                    config: {
                        baseUrl: "http://localhost:8081",
                        video: false,
                    },
                }).then(() => {
                    jake.exec(
                        "forever stopall",
                        () => {
                            console.log("stopped all servers");
                            process.exit();
                        },
                        {
                            printStderr: true,
                            printStdout: true,
                        },
                    );
                });
            },
            () => {
                console.log("successfully ran chrome tests");
            },
            {
                printStderr: true,
                printStdout: true,
            },
        );
    },
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
    console.log(files.toArray().toString());
    return files.toArray();
}
