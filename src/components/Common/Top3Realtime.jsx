import React, { useState, useEffect } from 'react'

import { BlurImg, Top3List } from 'components'
import { LineChart, Line, CartesianGrid, XAxis, Tooltip, ResponsiveContainer } from 'recharts'

import { getCurrentDay, handlePlayNewSong } from 'share/utilities'
import { Grid, Tooltip as MuiTooltip, IconButton } from '@mui/material'
import { defineColor } from 'services/Common/Top3Realtime'
import { BsFillPlayCircleFill } from 'react-icons/bs'
import { useStore, actions } from 'store'

const Top3Realtime = ({ top3 = [], defineLang, showTop3, styles }) => {
  const [state, dispatch] = useStore()
  const [activeItem, setActiveItem] = useState(0)

  if (top3.length === 0) return null

  const blurImgProps = {
    img: top3[activeItem]?.thumbnail,
    blurRadius: 100,
    className: 'relative h-full w-full',
  }

  const xAxisProps = {
    dataKey: 'time',
    allowDuplicatedCategory: false,
    axisLine: false,
    tickLine: false,
    tickMargin: 8,
    ticks: top3[0].viewIn24H.map((value, i) => (i % 2 === 0 ? value.time : null)).filter((value) => value !== null),
    tick: { fill: '#f4f6f899', fontSize: 12 },
    interval: 'preserveStartEnd',
  }

  const top3ListProps = {
    top3,
    activeItem,
    setActiveItem,
  }

  return (
    <div className={`bg-[linear-gradient(180deg,#740091,#2d1a4c)] rounded-4px z-1 relative overflow-hidden ${showTop3 ? 'h-[508px]' : 'h-[296px]'} ${styles}`}>
      <BlurImg {...blurImgProps} />
      <Grid container direction='column' className='absolute top-0'>
        <div className='flex relative flex-col h-[296px] w-full mb-2px'>
          <div className='flex w-full items-center justify-between py-16px px-[19px]'>
            <div className='text-sm'>
              <span className='text-slate-100 font-semibold mr-8px'>#NCTChart</span>
              <span className='text-white/50'>{getCurrentDay()}</span>
            </div>
            <div className='flex h-full' onClick={() => handlePlayNewSong(top3[0]?.songKey, dispatch, actions, state.curPlaylist, true, defineLang)}>
              <MuiTooltip title={defineLang('Phát tất cả', 'Play all')} arrow placement='top'>
                <IconButton className='hover:!bg-white/[.08]' aria-label='play-icon'>
                  <BsFillPlayCircleFill className='text-slate-100' />
                </IconButton>
              </MuiTooltip>
            </div>
          </div>
          <div className='px-24px relative flex items-end h-[calc(100%_-_63px)] w-full rounded-4px'>
            <ResponsiveContainer width='100%' height='100%'>
              <LineChart strokeDashArray={4} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
                <CartesianGrid
                  vertical={false}
                  strokeDasharray='5'
                  stroke='#f4f6f833
                '
                />
                <XAxis {...xAxisProps} />
                <Tooltip />
                {top3.map((item, i) => (
                  <Line id={item.songKey} type='monotone' dataKey='view' data={item.viewIn24H} name={item.title} key={item.songKey} stroke={defineColor(i)} dot={false} activeDot={{ strokeWidth: 2, r: 5 }} />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        {showTop3 && <Top3List {...top3ListProps} />}
      </Grid>
    </div>
  )
}

export default Top3Realtime
