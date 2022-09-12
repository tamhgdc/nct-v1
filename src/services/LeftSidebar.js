export const scrollBarStyles = {
  style: {
    width: '100%',
    height: '100%',
  },
  autoHide: true,
  autoHideTimeout: 300,
  autoHideDuration: 100,
  renderTrackVertical: ({style, ...props}) => (
    <div {...props} style={{...style, width: 3, top: 1, bottom: 1, right: 0, borderRadius: 3 }} />
  ),
}