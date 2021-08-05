# appstudio-live-reload #

a simple web server with "live-reload" for NSB/AppStudio

[NSB/AppStudio](https://www.nsbasic.com/) is a simple visual IDE to create applications for iOS, Android, Windows, macOS and Linux. These applications are based on Web technologies and may be written in JavaScript or BASIC. Combined with [VoltCloud.io](https://voltcloud.io/) (a deployment server which also integrates basic user management and a simple key-value store) AppStudio simplifies the development of applications for multiple independent users.

For the purpose of testing, AppStudio projects may be deployed to the local file system where they are read by an automatically started web server and sent to any connecting web browser.

While this procedure sounds convenient at a first glance, it may become cumbersome as soon as one starts developing for smartphone or tablets and wants to preview and test snapshots on these external devices (rather than on the desktop). A similar situation occurs when AppStudio is used for UI development only, and business logic and/or style sheets are developed with the help of third-party tools (e.g., in order to benefit from preprocessors such as TypeScript, Babel, SASS etc.) - in such a case, changing an external file would always  require an additional deployment via AppStudio although a simple file copy could be sufficient.

**Live Reloading**

A common solution to this problem is "[live-reloading](http://livereload.com/)" of web pages (also available as an [NPM package](https://www.npmjs.com/package/livereload) for more platforms than just macOS)

"Live-reloading" uses an additional "monitoring server" (besides the normal web server) which monitors a given deployment folder and informs any connected application to update or reload itself whenever any changes in the deployment folder are detected. For that purpose, the application is supplemented by a small script which handles communication with the monitoring server and performs any updates or reloads whenever needed.

**appstudio-live-reload**

`appstudio-live-reload` offers "live-reloading" for AppStudio projects by providing both web and monitoring servers and the supplemental script (which is automatically configured for the monitoring server).

For `appstudio-live-reload` to work as foreseen, the supplemental script has to be added to an AppStudio application (which is just a simple setting in the AppStudio "Project Explorer") and the servers started prior to new deployments (in order to configure the supplemental script for the actual IP address of your development machine). After an initial deployment, you may now navigate to the application from any browser (even multiple browsers simultaneously) and any new deployment will automatically update or reload the application on any connected browser.

The supplemental script may be removed for official releases - otherwise, it will just fail to contact the monitoring server and the application work as usual (i.e., without any automatic update or reload)

**NPM users**: please consider the [Github README](https://github.com/rozek/appstudio-live-reload/blob/main/README.md) for the latest description of this package (as updating the docs would otherwise always require a new NPM package version)

Just a small note: if you like this script and plan to use it, consider "starring" this repository (you will find the "Star" button on the top right of this page), such that I know which of my repositories to take most care of.

## Prerequisites ##

`appstudio-live-reload` requires Node.js. Since you are visiting this page, chances are good that you already have Node.js installed on your machine - if not, please follow the instructions found on [nodejs.org](https://nodejs.org/) to install it (the LTS version is sufficient if you don't plan to use Node.js on a regular basis)

## App Preparation ##

`livereload` requires a small supplemental script to be added to your project. Within Appstudio, add the following lines to the `extraFiles` and `extraheaders` of your project settings (found in the "Project Explorer")

* **extraFiles**: `live-reload.js`
* **extraheaders**: `<script src="live-reload.js"></script>`

Just "copy-and-paste" the shown texts from here into AppStudio. From the next deployment on (provided that the "monitoring server" is running) your application will automatically be updated and/or reloaded whenever any change in the deployment folder is detected.

## Installation and Use ##

`appstudio-live-reload` may either be used with or without prior installation.

If you prefer an explicit installation, simply open a terminal window, navigate to the folder for your AppStudio project and instruct NPM to install the package:

```
cd XXX.appstudio
npm install --save appstudio-live-reload
```

You may then start web and monitoring server using

```
npx appstudio-live-reload
```

From then on, every local deployment of your project (and any changes made by external tools) will be detected and any connected browser instructed to update or reload the application. Simply navigate to

```
https://localhost:34567
```

or to

```
https://a.b.c.d:34567
```

where `a.b.c.d` stands for the IP address of your development machine.

## Use without explicit Installation

If you do not want to install `appstudio-live-reload` (e.g., because you do not want to pollute your project folder with `node_modules/`, `package-lock.json` and `package.json`), just open a terminal window, navigate to the folder for your AppStudio project and start web and monitoring server using

```
cd XXX.appstudio
npx appstudio-live-reload
```

When invoked for the first time, you may be asked whether you really want to "install" `appstudio-live-reload` - in that case, do not worry and simply press "Return" or "Enter" to proceed: your project folder will remain "clean".

From now on, again, every subsequent local deployment of your project (and any changes made by external tools) will be detected and any connected browser instructed to update or reload the application. Simply navigate to

```
https://localhost:34567
```

or to

```
https://a.b.c.d:34567
```

where `a.b.c.d` stands for the IP address of your development machine.

## License ##

[MIT License](LICENSE.md)
