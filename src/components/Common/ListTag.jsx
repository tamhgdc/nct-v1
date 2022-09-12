import React from 'react'
import TagLabel from './TagLabel'

const ListTag = ({ listTag, defineLang, styles = '', titleStyles = '', tagsStyles = '' }) =>
  listTag.length === 0 || (
    <div className={`mt-12px w3-row ${styles}`}>
      <div className={`w3-col text-sm color-0-5 w-fit ${titleStyles}`}>Tags:</div>
      <div className={`w3-rest pr-4 ${tagsStyles}`}>
        {listTag.map((tag) => (
          <TagLabel key={tag.key} title={tag.name} />
        ))}
      </div>
    </div>
  )

export default ListTag
