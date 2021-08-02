# appstudio-live-reload #

a simple web server with "live-reload" for NSB/AppStudio

[NSB/AppStudio](https://www.nsbasic.com/) is a simple visual IDE to create applications for iOS, Android, Windows, macOS and Linux. These applications are based on Web technologies and may be written in JavaScript or BASIC. Combined with [VoltCloud.io](https://voltcloud.io/) (a deployment server which also integrates basic user management and a simple key-value store) AppStudio simplifies the development of applications for multiple independent users.

For the purpose of testing, AppStudio projects may be deployed to the local file system where they are read by an automatically started web server and served to any connecting web browser.

While this procedure sounds convenient at a first glance, it may become cumbersome as soon as one starts developing for smartphone, tablets, convertibles (or even VR glasses) and wants to preview and test snapshots on these external devices (rather than on the desktop). A similar situation occurs when AppStudio is only used for UI development only, and business logic and/or style sheets are developed using third-party tools (e.g., in order to benefit from preprocessors such as TypeScript, Babel, SASS etc.) - in such a case, changing an external file would always require an explicit deployment using AppStudio itself even if actually a simple file copy could be sufficient.

A common solution to this problem is "[live-reloading](http://livereload.com/)" of web pages (also available as an [NPM package](https://www.npmjs.com/package/livereload))

`appstudio-live-reload` provides "live-reloading" for AppStudio projects.

**NPM users**: please consider the [Github README](https://github.com/rozek/appstudio-live-reload/blob/main/README.md) for the latest description of this package (as updating the docs would otherwise always require a new NPM package version)

## Prerequisites ##

`appstudio-live-reload` requires Node.js. Since you are visiting this page, chances are good that you already have Node.js installed on your machine - if not, please follow the instructions found on [nodejs.org](https://nodejs.org/) to install it (the LTS version is sufficient if you don't plan to use Node.js on a regular basis)

## App Preparation ##

`livereload` requires a small helper script to be added to your project. Within Appstudio, add the following lines to the `extraFiles` and `extraheaders` of your project settings (found in the "Project Explorer")

* **extraFiles**: `live-reload.js`
* **extraheaders**: `<script src="live-reload.js"></script>`

Just "copy-and-paste" the shown texts from here into AppStudio. From the next deployment on - and if the "live-reload"-capable web server is running - your application will automatically be modified and/or reloaded whenever any change in the deployment folder is detected.

## Installation and Use ##

`appstudio-live-reload` may either be used with or without prior installation.

If you prefer an explicit installation, simply open a terminal window, navigate to the folder for your AppStudio project and instruct NPM to install the package:

```
cd XXX.appstudio
npm install --save appstudio-live-reload
```

You may then start a "live-reload"-capable web server using

```
npx appstudio-live-reload
```

From then on, every deployment of your project (into a local folder) will be detected and any connected browser instructed to update or reload the application. Simply navigate to

```
https://localhost:34567
```

or to

```
https://a.b.c.d:34567
```

where `a.b.c.d` stands for the IP address of your development machine.

## Use without explicit Installation

If you do not want to install `appstudio-live-reload`, just navigate to the folder for your AppStudio project and start a "live-reload"-capable web server using

```
cd XXX.appstudio
npx appstudio-live-reload
```

Again, every subsequent deployment of your project (into a local folder) will be detected and any connected browser instructed to update or reload the application. Simply navigate to

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
