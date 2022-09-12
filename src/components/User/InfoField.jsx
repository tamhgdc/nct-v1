import React from 'react'

const InfoField = ({ title = '', value = '', extraComp, styles = '', valueStyles = '' }) => (
  <div className={`w3-row flex w-full h-full leading-16 rounded-4px bg-color-0-02 mt-4px ${styles}`}>
    <div className='w3-col flex items-center ml-16px text-13px color-0-5 w-min whitespace-nowrap font-normal'>{title}:</div>
    <div className={`whitespace-pre-line ml-12px text-13px font-medium py-4 leading-22px color-0-88 w-fit ${valueStyles}`}>{value}</div>
    {extraComp}
  </div>
)

export default InfoField
