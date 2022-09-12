import React from 'react'

const Description = ({ description, styles = '' }) => (description && <div className={`mt-12px text-sm color-0-5 line-clamp-5 font-normal ${styles}`}>{description}</div>)

export default Description
