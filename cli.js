#!/usr/bin/env node
//------------------------------------------------------------------------------
//--                      appstudio-live-reload - Server                      --
//------------------------------------------------------------------------------

import('javascript-interface-library').then((JIL) => {
  const {
    throwError, expectBoolean, expectIntegerInRange, expectOrdinal
  } = JIL

  const os      = require('os')
  const path    = require('path')
  const connect = require('connect')
  const static  = require('serve-static')

/**** what are we talking about? ****/

  const BaseFolder       = process.cwd()
  const ProjectName      = path.basename(BaseFolder,'.appstudio')
  const DeploymentFolder = path.join(BaseFolder,ProjectName)

/**** parse command line arguments ****/

  let {
    port:  WebServerPort = 34567,
    reload:ReloadPort    = 35729,
    delay: ReloadDelay   = 100,
    usePolling           = false
  } = require('command-line-parser')({ booleanKeys:['usePolling'] })

  expectIntegerInRange   ('web server "port"',WebServerPort, 2001,65535)
  expectIntegerInRange('"reload" server port',ReloadPort,    2001,65535)

  if (WebServerPort === ReloadPort) throwError(
    'InvalidArgument: web server and reload server must not use the same port'
  )

  expectOrdinal   ('reload "delay"',ReloadDelay)
  expectBoolean('"usePolling" flag',usePolling)

/**** collect handled IPv4 addresses (incl. "localhost") ****/

  const IPAddresses = []
    const NetworkInterfaces = os.networkInterfaces()
    for (const NetworkName of Object.keys(NetworkInterfaces)) {
      for (const Network of NetworkInterfaces[NetworkName]) {
        if (Network.family === 'IPv4') {
          IPAddresses.push(Network.address)
        }
      }
    }
  IPAddresses.sort()

/**** create, configure and start servers ****/

  let WebServer = connect()       // HTTP server to serve actual web application
    WebServer.use(static(DeploymentFolder))
  WebServer.listen(WebServerPort)

  const livereload = require('livereload')
    let ReloadServer = livereload.createServer({  // server watching for changes
      port:ReloadPort,
      delay:ReloadDelay,           // because many files will be changed at once
      usePolling
    }, reportAvailability)
  ReloadServer.watch(DeploymentFolder)

  function reportAvailability () {
    console.clear()

    console.log('livereload-server')
    console.log('- AppStudio Project: "' + ProjectName + '"')
    console.log('- Deploxment Folder: "' + DeploymentFolder + '"')
    console.log('- IPv4 Addresses:')
      IPAddresses.forEach((IPAddress) => console.log('  - ' + IPAddress))
    console.log('- Web Server Port:  ' + WebServerPort)
    console.log('- Live-Reload Port: ' + ReloadPort)
  }
})
