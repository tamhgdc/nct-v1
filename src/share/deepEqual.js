function deepEqual(object1, object2) {
  const areObjects = isObject(object1) && isObject(object2)

  if (areObjects) {
    const keys1 = Object.keys(object1)
    const keys2 = Object.keys(object2)
    if (keys1.length !== keys2.length) {
      return false
    }
    for (const key of keys1) {
      const val1 = object1[key]
      const val2 = object2[key]
      const areObjects = isObject(val1) && isObject(val2)
      if ((areObjects && !deepEqual(val1, val2)) || (!areObjects && val1 !== val2)) {
        return false
      }
    }
    return true
  } else {
    return false
  }
}
function isObject(object) {
  return object != null && typeof object === 'object'
}

export default deepEqual