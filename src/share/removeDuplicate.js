const removeDuplicate = (arr, key) => {
  if (key) {
    const uniqueArr = arr.filter((value, index, self) => index === self.findIndex((t) => t[key] === value[key]))

    return uniqueArr
  } else {
    const uniqueArr = arr.filter((value, index, self) => index === self.findIndex((t) => (t.key || t.keyId || t.songId) === (value.key || value.keyId || value.songId)))

    return uniqueArr
  }
}

export default removeDuplicate
