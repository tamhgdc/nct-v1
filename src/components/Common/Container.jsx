import React from 'react'
import Footer from './../Footer/Footer'

const Container = ({ children }) => {
  return (
    <React.Fragment>
      <div className='h-full min-h-[calc(100vh_-_12.2rem)] margin-footer'>{children}</div>
      <Footer />
    </React.Fragment>
  )
}

export default Container
