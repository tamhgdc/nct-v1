// Source: https://blog.napthedev.com/post/10-doan-code-javascript-huu-ich

const convertDuration = (seconds) => {
  try {
    if (seconds < 3600) {
      return new Date(seconds * 1000).toISOString().substring(14, 19)
    } else {
      return new Date(seconds * 1000).toISOString().substring(11, 16)
    }
  } catch (error) {
    return '00:00'
  }
}

export default convertDuration
