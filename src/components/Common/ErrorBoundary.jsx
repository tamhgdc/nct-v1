import { Component } from 'react'
import { NotFound } from 'pages'
import { toastNotify } from 'share/toast'

class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }
  static getDerivedStateFromError(error) {
    return { hasError: true }
  }
  componentDidCatch(error, errorInfo) {
    // Send error information to the server for devs to fix bug
    const lang = localStorage.getItem('lang')

    console.log('error: ', error)
    console.log('errorInfo: ', errorInfo)
    
    toastNotify(lang === 'vi' ? 'Có lỗi khi lấy dữ liệu từ server.' : 'A server error occurred while retrieving data.', 'error')
  }
  render() {
    if (this.state.hasError) {
      return <NotFound />
    }
    return this.props.children
  }
}

export default ErrorBoundary
