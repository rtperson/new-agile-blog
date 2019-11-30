const { task, desc } = require("jake");
const fileList = require("filelist");
const rimraf = require("rimraf");
const { jestCLI } = require("jest-cli");
const jestConfig = require("./jest.config");

desc("This is the default task");
task("default", ['lint', 'compile-ts', 'test-server'], function() {
   console.log("hello world");
   complete();
}, true);

desc("Cleans all build files");
task("clean", [], () => {
    rimraf("dist", () => {
        console.log("build files deleted");
        complete();
    })
});

desc("lint all Typescript files");
task("lint", async function() {
    const cmd = ["eslint"].concat(getSourceFileList()).join(" ");
    jake.exec(cmd,() => {
        console.log("all files linted");
    }, {printStderr: true, printStdout: true })
}, true);

desc("This is the TypeScript compilation task");
task("compile-ts", async function() {
    const cmd = ["tsc"].concat(getSourceFileList()).join(" ");
    console.log(cmd);
    jake.exec(cmd, () => {
       console.log("typescript compilation completed");
       complete();
    }, {printStderr: true, printStdout: true });
}, true);

desc("run all server-side tests");
task("test-server", () => {
    jake.exec("jest --coverage", () => {
        console.log("server tests completed");
        complete();
    }, {printStderr: true, printStdout: true });
}, true);

function getSourceFileList() {
     let files = new fileList.FileList();
     files.include("src/**/*.ts");
     files.exclude("src/**/*.spec.ts");
     files.exclude("node_modules");
     files.exclude("dist");
     return files.toArray();
}
