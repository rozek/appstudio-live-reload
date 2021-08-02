# appstudio-live-reload #

a simple web server with "live-reload" for NSB/AppStudio

[NSB/AppStudio](https://www.nsbasic.com/) is a simple visual IDE to create applications for iOS, Android, Windows, macOS and Linux. These applications are based on Web technologies and may be written in JavaScript or BASIC. Combined with [VoltCloud.io](https://voltcloud.io/) (a deployment server which also integrates basic user management and a simple key-value store) AppStudio simplifies the development of applications for multiple independent users.

For testing purposes, AppStudio projects may be deployed to the local file system and a web server be started which allows the application to be loaded into a web browser.

While this procedure sounds convenient at a first glance, it may become cumbersome as soon as one starts developing for smartphone, tablets, convertibles (or even VR glasses) and wants to preview and test snapshots on these external devices (rather than on the desktop). The situation gets even worse if AppStudio is only used for the UI development and business logic and/or style sheets are developed outside (e.g., in order to benefit from preprocessors such as TypeScript, Babel, SASS etc.) - in that case, changing an external file would still require an explicit deployment through AppStudio although a simple copy of a single file could otherwise be sufficient.

A common solution to this problem is "[live-reloading](http://livereload.com/)" of web pages (also available as an [NPM package](https://www.npmjs.com/package/livereload))

`appstudio-live-reload` provides "live-reloading" for AppStudio projects and simplifies installation and use of that feature.

**NPM users**: please consider the [Github README](https://github.com/rozek/appstudio-live-reload/blob/main/README.md) for the latest description of this package (as updating the docs would otherwise always require a new NPM package version)

## Prerequisites ##

`appstudio-live-reload` requires Node.js. Since you are visiting this page, the chance is high that you already have Node.js installed on your machine - if not, please follow the instructions found on [nodejs.org](https://nodejs.org/) to install it (the LTS version is sufficient if you don't plan to use Node.js on a regular basis)

## Installation ##

`appstudio-live-reload` has to be installed once per AppStudio project. Just open a terminal window, navigate to the folder for your AppStudio project and use NPM to install the package:

```
cd XXX.appstudio
npm install --save appstudio-live-reload
```

## App Preparation ##

`livereload` requires a small script to be added to your project. Within Appstudio, add the following lines to the `extraFiles` and `extraheaders` of your project settings (found in the "Project Explorer")

* extraFiles: `./node_modules/appstudio-live-reload/live-reload.js`
* extraheaders: `<script src="./node_modules/appstudio-live-reload/live-reload.js "></script>`

Simply copy the shown texts from here into AppStudio. From the next deployment on, your application will automatically be modified and/or reloaded whenever the "live-reload"-capable server is running and detects any changes in the deployment folder.

## Usage ##

The following command starts a "live-reload"-capable web server

```
npx appstudio-live-reload
```

Start this server prior to your first deployment and leave it running while you are developing. The server will detect any changes in the deployment folder and modify our reload your application accordingly - in any browser from which you are currently using it

## License ##

[MIT License](LICENSE.md)
