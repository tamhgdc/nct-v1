const isEmptyObject = (obj) => obj != null && typeof obj === 'object' && obj && Object.keys(obj).length === 0 && Object.getPrototypeOf(obj) === Object.prototype

export default isEmptyObject
