// removeFromFlow 默认占位
const hideElement = (el, removeFromFlow = false) => {
    removeFromFlow ? (el.style.display = 'none')
    : (el.style.visibility = 'hidden')
  }
  