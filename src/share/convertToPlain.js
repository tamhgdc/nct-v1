// Source: https://dev.to/sanchithasr/3-ways-to-convert-html-text-to-plain-text-52l8

const convertToPlain = (html) => {
  // Create a new div element
  const tempDivElement = document.createElement('pre')

  // Set the HTML content with the given value
  tempDivElement.innerHTML = html

  // Retrieve the text property of the element
  return tempDivElement.innerText || tempDivElement.textContent || ''
}

export default convertToPlain