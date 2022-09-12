import React from 'react'

const ViewDate = ({ defineLang, styles = '', viewStyles = '', dateStyles = '', view, dateRelease }) => {
  if (!view) return null
  if (!dateRelease) return null

  return (
    <div className={`w3-row mt-14px flex items-center ${styles}`}>
      <div className={`w3-col text-13px color-0-5 w-fit font-normal ${viewStyles}`}>
        {view.toLocaleString('en-US')} {defineLang('Lượt nghe', 'Listens')}
      </div>
      {dateRelease && (
        <React.Fragment>
          <div className='w3-col w-4px h-4px bg-color-0-5 rounded-2px mr-8px ml-14px'></div>
          <div className={`w3-rest text-13px color-0-5 w-fit ${dateStyles}`}>{new Date(dateRelease).toLocaleDateString()}</div>
        </React.Fragment>
      )}
    </div>
  )
}

export default ViewDate
