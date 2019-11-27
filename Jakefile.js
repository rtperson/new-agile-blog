const { task, desc } = require("jake");

desc("This is the default task");
task("default", ['lint', 'compile-ts'], function() {
   console.log("hello world");
});

desc("lint all Typescript files");
task("lint", async function() {
    jake.exec("eslint ./src/*",function() {
        console.log("all files linted");
    }, {printStderr: true, printStdout: true })
});

desc("This is the TypeScript compilation task");
task("compile-ts", async function() {
    jake.exec("tsc", ["/src"] , function() {
       console.log("typescript compilation completed")
    });
}, {printStderr: true, printStdout: true });

function getSourceFileList() {
     let files = new jake.FileList();
     files.include("src/**/*.ts");
     files.exclude("node_modules");
     files.exclude("dist");
     return files.toArray();
}
