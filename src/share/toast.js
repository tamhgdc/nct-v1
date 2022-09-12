import { toast, Slide } from 'react-toastify'

// Auth Toast
export const toastNotify = (message, status = 'info', hideProgressBar = true) =>
  toast[status](message, {
    position: 'top-right',
    autoClose: 3000,
    hideProgressBar,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    transition: Slide,
    theme: localStorage.getItem('theme'),
  })
