let { task, desk } = require('jake');
let typescript = require('typescript');

desc('This is the default task');
task('default', function() {
   console.log("hello world");
});

desc('This is the TypeScript compilation task');
task('compile-ts', function() {
    typescript.
    jake.exec('tsc', {}, function() {
       console.log("typescript compilation completed")
    });
});
