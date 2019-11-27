#!/bin/sh

[ ! -f node_modules/.bin/jake ] && npm rebuild
export PATH=$PATH:./node_modules/.bin
node_modules/.bin/jake $*
