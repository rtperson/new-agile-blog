#!/bin/sh

[ ! -f node_modules/.bin/jake ] && npm rebuild
chmod 755 ./node_modules/.bin
export PATH=$PATH:./node_modules/.bin
node_modules/.bin/jake $*
