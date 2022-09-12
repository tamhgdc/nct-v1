import { ErrorBoundary } from 'react-error-boundary'
import { NotFoundV2 } from 'components'
import { useStore } from 'store'

const ErrorFallback = ({ error, resetErrorBoundary }) => {
  console.log('error: ', error)
  const [state] = useStore()
  const defineLang = (vie, eng) => state.lang === 'vi' ? vie : eng

  return <NotFoundV2 message={defineLang('Có lỗi khi lấy dữ liệu từ server.', 'A server error occurred while retrieving data.')} />
}

export { ErrorBoundary, ErrorFallback }