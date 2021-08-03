#!/usr/bin/env node
//------------------------------------------------------------------------------
//--                      appstudio-live-reload - Server                      --
//------------------------------------------------------------------------------

import('javascript-interface-library').then((JIL) => {
  const {
    throwError, expectBoolean, expectIntegerInRange, expectOrdinal
  } = JIL

  const os      = require('os')
  const fs      = require('fs')
  const path    = require('path')
  const connect = require('connect')
  const static  = require('serve-static')

/**** what are we talking about? ****/

  const BaseFolder       = process.cwd()
  const ProjectName      = path.basename(BaseFolder,'.appstudio')
  const DeploymentFolder = path.join(BaseFolder,ProjectName)

/**** parse command line arguments ****/

  let {
    port:   WebServerPort = 34567,
    monitor:MonitorPort   = 35729,
    delay:  ReloadDelay   = 100,
    usePolling            = false
  } = require('command-line-parser')({ booleanKeys:['usePolling'] })

  expectIntegerInRange    ('web server port',WebServerPort, 2001,65535)
  expectIntegerInRange('monitor server port',MonitorPort,   2001,65535)

  if (WebServerPort === MonitorPort) throwError(
    'InvalidArgument: web server and monitor server must not use the same port'
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

/**** provide supplemental script ****/

  let supplementalScript = `//------------------------------------------------------------------------------
//--               appstudio-live-reload - supplemental Script                --
//------------------------------------------------------------------------------

  const MonitorPort = '{{MonitorPort}}'
  if (MonitorPort !== '') {
    let MonitorServer = window.location.hostname + ':' + MonitorPort

    let MonitorScript = document.createElement('script')
      document.head.appendChild(MonitorScript)
    MonitorScript.src = 'http://' + MonitorServer + '/livereload.js?snipver=1'
  }
  `.replace('{{MonitorPort}}',MonitorPort)

  fs.writeFileSync(path.join(BaseFolder,'live-reload.js'),supplementalScript)

/**** create, configure and start servers ****/

  let WebServer = connect()       // HTTP server to serve actual web application
    WebServer.use(static(DeploymentFolder))
  WebServer.listen(WebServerPort)

  const livereload = require('livereload')
    let MonitoringServer = livereload.createServer({     // watching for changes
      port: MonitorPort,
      delay:ReloadDelay,           // because many files will be changed at once
      usePolling
    }, reportAvailability)
  MonitoringServer.watch(DeploymentFolder)

  function reportAvailability () {
    console.clear()

    console.log('livereload-server')
    console.log('- AppStudio Project: "' + ProjectName + '"')
    console.log('- Deployment Folder: "' + DeploymentFolder + '"')
    console.log('- IPv4 Addresses:')
      IPAddresses.forEach((IPAddress) => console.log('  - ' + IPAddress))
    console.log('- Web Server Port:  ' + WebServerPort)
    console.log('- Monitoring Port:  ' + MonitorPort)
  }
})
