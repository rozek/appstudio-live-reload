//------------------------------------------------------------------------------
//--                  appstudio-live-reload - Helper Script                   --
//------------------------------------------------------------------------------

  const ReloadPort = '35729'
  if (ReloadPort !== '') {
    let ReloadServer = window.location.hostname

    let ReloadScript = document.createElement('script')
      document.head.appendChild(ReloadScript)
    ReloadScript.src = `http://${ReloadServer}:${ReloadPort}/livereload.js?snipver=1`
  }

