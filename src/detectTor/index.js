const detectTor = () => {
  const date = new Date()
  if (
    navigator.plugins.length === 0 &&
    date.getTimezoneOffset() === 0 &&
    window.outerWidth === window.screen.availWidth &&
    window.outerHeight === window.screen.availHeight
  ) {
    return true
  }
  return false
}

export default detectTor
