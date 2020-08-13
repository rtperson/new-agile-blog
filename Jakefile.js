/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-use-before-define */

const { task, desc } = require("jake");
const fileList = require("filelist");
const rimraf = require("rimraf");
const karma = require("simplebuild-karma");
const NODE_VERSION = "v8.11.3";


desc("This is the default task");
task("default", ["lint", "nodeVersion", "compile-ts", "test-server", "karma-test"]);

desc("Cleans all build files");
task("clean", [], () => {
    rimraf("dist", () => {
        console.log("build files deleted");
        complete();
    });
});

desc("lint all Typescript files");
task(
    "lint",
    async function() {
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
    async function() {
        const cmd = "tsc";
        console.log(cmd);
        jake.exec(
            cmd,
            () => {
                console.log("typescript compilation completed");
                complete();
            },
            { printStderr: true, printStdout: true },
        );
    },
    true,
);

desc("run all server-side tests");
task(
    "test-server",
    async () => {
        jake.exec(
            "jest --detectOpenHandles --forceExit --coverage",
            () => {
                console.log("server tests completed");
                complete();
            },
            { printStderr: true, printStdout: true },
        );
    },
    true,
);

desc("lint all client code");
task("lint-client", [], () => {

});

desc("run all client-side tests");
task("test-client", async () => {

}, true);



desc("Integrate");
task("integrate", ["default"], function() {
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
task("nodeVersion", [], function() {
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

desc("start Karma server for testing");
task("karma", ["nodeVersion"], () => {
    karma.start({
        configFile: "karma.conf.js"
    }, complete, fail);
}, {async: true });

desc("run Karma tests");
task("karma-test", ["nodeVersion"], () => {

    karma.run({
        configFile: "karma.conf.js",
       }, complete, fail);
}, {async: true });


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

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function getSourceFileServerList() {
    const files = new fileList.FileList();
    files.include("src/**/*.ts");
    files.exclude("src/**/*.spec.ts");
    //files.exclude("src/client/**");
    files.exclude("node_modules");
    files.exclude("dist");
    return files.toArray();
}
