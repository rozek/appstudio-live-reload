# appstudio-live-reload #

a simple web server with "live-reload" for NSB/AppStudio

[NSB/AppStudio](https://www.nsbasic.com/) is a simple visual IDE to create applications for iOS, Android, Windows, macOS and Linux. These applications are based on Web technologies and may be written in JavaScript or BASIC. Combined with [VoltCloud.io](https://voltcloud.io/) (a deployment server which also integrates basic user management and a simple key-value store) AppStudio simplifies the development of applications for multiple independent users.

For testing purposes, AppStudio projects may be deployed to the local file system and a web server be started which allows the application to be loaded into a web browser.

While this procedure sounds convenient at a first glance, it may become cumbersome as soon as one starts developing for smartphone, tablets, convertibles (or even VR glasses) and wants to preview and test snapshots on these external devices (rather than on the desktop). The situation gets even worse if AppStudio is only used for the UI development and business logic and/or style sheets are developed outside (e.g., in order to benefit from preprocessors such as TypeScript, Babel, SASS etc.) - in that case, changing an external file would still require an explicit deployment through AppStudio although a simple copy of a single file could otherwise be sufficient.

A common solution to this problem is "[live-reloading](http://livereload.com/)" of web pages (also available as an [NPM package](https://www.npmjs.com/package/livereload))

This package provides "live-reloading" for AppStudio projects and simplifies installation and use of that feature.

**NPM users**: please consider the [Github README](https://github.com/rozek/appstudio-live-reload/blob/main/README.md) for the latest description of this package (as updating the docs would otherwise always require a new NPM package version)

## Prerequisites ##

## Use without Installation ##

## Installation and Use ##


## License ##

[MIT License](LICENSE.md)
