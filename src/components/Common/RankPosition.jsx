const RankPosition = ({ highestPosition, oldPosition, totalWeekInRanked, defineLang }) => (
  <div className='w3-row'>
    <div className='w3-third'>
      <div className='rank-position'>
        <div className='rank-position-number text-yellow'>{oldPosition || '-'}</div>
        <div className='rank-title'>{defineLang('Tuần trước', 'Last week')}</div>
      </div>
    </div>
    <div className='w3-third'>
      <div className='rank-position'>
        <div className='rank-position-number text-main'>{highestPosition || '-'}</div>
        <div className='rank-title'>{defineLang('Cao nhất', 'Peak position')}</div>
      </div>
    </div>
    <div className='w3-third'>
      <div className='rank-position'>
        <div className='rank-position-number text-green'>{totalWeekInRanked || '-'}</div>
        <div className='rank-title'>{defineLang('Tuần trong BXH', 'Week in chart')}</div>
      </div>
    </div>
  </div>
)

export default RankPosition
