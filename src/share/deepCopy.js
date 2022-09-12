// Source: https://anonystick.com/blog-developer/deep-copy-object-array-function-javascript-2019112981990595

function getType(obj) {
  const str = Object.prototype.toString.call(obj)
  const map = {
    '[object Boolean]': 'boolean',
    '[object Number]': 'number',
    '[object String]': 'string',
    '[object Function]': 'function',
    '[object Array]': 'array',
    '[object Date]': 'date',
    '[object RegExp]': 'regExp',
    '[object Undefined]': 'undefined',
    '[object Null]': 'null',
    '[object Object]': 'object',
  }
  if (obj instanceof Element) {
    return 'element'
  }
  return map[str]
}

//for array
function copyArray(ori, type, copy = []) {
  for (const [index, value] of ori.entries()) {
    copy[index] = deepCopy(value)
  }
  return copy
}

//for object
function copyObject(ori, type, copy = {}) {
  for (const [key, value] of Object.entries(ori)) {
    copy[key] = deepCopy(value)
  }
  return copy
}

//for function
function copyFunction(ori, type, copy = () => {}) {
  const fun = eval(ori.toString())
  fun.prototype = ori.prototype
  return fun
}

function deepCopy(ori) {
  const type = getType(ori)
  let copy
  switch (type) {
    case 'array':
      return copyArray(ori, type, copy)
    case 'object':
      return copyObject(ori, type, copy)
    case 'function':
      return copyFunction(ori, type, copy)
    default:
      return ori
  }
}

export default deepCopy
