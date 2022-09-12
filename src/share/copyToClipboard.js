// Source: https://blog.napthedev.com/post/10-doan-code-javascript-huu-ich
const copyToClipboard = (text) => {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text)
    } else {
      let textArea = document.createElement('textarea')
      textArea.value = text
      textArea.style.position = 'fixed'
      textArea.style.left = '-999999px'
      textArea.style.top = '-999999px'
      document.body.appendChild(textArea)
      textArea.focus()
      textArea.select()
      return new Promise((res, rej) => {
        document.execCommand('copy') ? res() : rej()
        textArea.remove()
      })
    }
  } catch (error) {
    console.error(error)
  }
}

export default copyToClipboard
