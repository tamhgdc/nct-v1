import React from 'react'

const TagLabel = ({ title, tagStyles = '', triangleStyles = '' }) =>
  title && (
    <div className={`relative pt-4px px-12px pb-2 bg-color-0-05 ml-18px mb-4px rounded-tl-4px rounded-bl-4px text-sm color-0-5 inline-block ${tagStyles}`}>
      <span className={`absolute -right-4 bottom-0 w-0 h-0 border-y-15px border-solid !border-b-transparent !border-t-transparent border-l-10px border-0-05 rounded-tl-3px rounded-bl-3px ${triangleStyles}`}></span>
      {title}
    </div>
  )

export default TagLabel
