@echo off
if not exist node_modules\.bin\jake.cmd call npm rebuild
SET PATH=%PATH%;.\node_modules\.bin
node node_modules\jake\bin\cli.js %*
