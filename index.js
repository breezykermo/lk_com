let PATHNAME = window.location.pathname
function update() {
  PATHNAME = window.location.pathname
}
function goToPath(pth) {
  window.history.pushState({}, "", pth)
}
function scrollTo(elId) {
  const el = document.getElementById(elId)
  const width  = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  if (width < 1080) {

    const rect = el.getBoundingClientRect()
    window.scrollTo(0, rect.top - 60)

  }
  // else {
  //   el.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"})
  // }
}

window.clickHandler = function clickHandler(pth) {
  goToPath(pth)
  // scrollTo(`${pth.split('/')[1]}-label`)
}


// go to path if given
if (PATHNAME !== "/") {
  const id = PATHNAME.split("/")[1]
  document.getElementById(id).checked = true
  scrollTo(`${id}-label`)
}


