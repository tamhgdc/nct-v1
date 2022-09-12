// Source: https://blog.napthedev.com/post/10-doan-code-javascript-huu-ich
const formatNumber = (num) => {
  return Intl.NumberFormat('en-US', {
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(num)
}

export default formatNumber
