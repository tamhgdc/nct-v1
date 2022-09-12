export const getTopicEventTitle = (topicName) => {
  const dashIndex = topicName.indexOf('_')

  if (dashIndex) {
    return ({
      vieTitle: topicName.substring(0, dashIndex),
      enTitle: topicName.substring(dashIndex + 1)
    })
  }
}