const logger = (reducer) => {
  return (prevState, action) => {
    console.group(action.type)
    console.log('Prev state: ', prevState)
    console.log('Action: ', action)

    const nextState = reducer(prevState, action)

    console.log('Next state: ', prevState)
    console.groupEnd()

    return nextState
  }
}

export default logger
