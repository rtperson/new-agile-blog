Agile Blog
===========

A replacement for my other blog.

I started this code with the intention to make a complete replacement for my
blog https://www.gatheringagility.com, with the following rules:

* Wherever possible, all code will be written in TDD style
* No frameworks unless they are small enough to feel like I understand them thoroughly So yes to Express, no to React and Angular. While there's nothing wrong with popular JS frameworks, they tend to grow and die like weeds, and I'd rather minimize the impact of having to chase the latest framework.
* Use TypeScript, because it eliminates most of what I hate about Javascript. Plus, it was an opportunity to learn TypeScript.

Mostly, this is my test bed in which to learn how to do TDD with a JS stack, and as such it has been very successful. 

My worst experiences have been

* Karma, which I had great hopes for but eventually ditched in favor of Cypress
* Trying to get a reliable way to start and stop an Express server from the command line in both Windows 10 and MacOS. I have tried PM2, nodemon, and forever, and they all seem to have interoperability problems.

Thanks to James Shore for the inspiration to try this style of coding on a web project. 
