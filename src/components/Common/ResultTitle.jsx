import React from 'react'

const ResultTitle = ({ defineLang, title = '', total = 0, styles = '' }) => {
  return (
    <div className={`text-22px font-bold color-0-88 ${styles}`}>
      {title}{' '}
      <span className='text-sm font-semibold color-0-5'>({defineLang(`Có ${total.toLocaleString('en-US')} kết quả`, `${total > 1 ? `There are ${total.toLocaleString('en-US')} results` : `There is ${total} result`}`)})</span>
    </div>
  )
}

export default ResultTitle
