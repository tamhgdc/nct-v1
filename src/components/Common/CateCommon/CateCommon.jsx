import Box from '@mui/material/Box'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'

const CateCommon = ({ categories, curCate, handleCateChange, defineLang, styles = '', cateStyles = '' }) => (
  <Box sx={{ width: '100%' }} className={styles}>
    <Tabs className='flex flex-wrap border-b border-solid border-0-05' value={curCate} onChange={handleCateChange} centered>
      {categories.map((cate) => {
        const { title, value } = cate
        return <Tab key={value} className={`sm:w-40 md:w-44 ip5:w-80px height-32px p-0 fz-13px font-bold color-0-88 ${cateStyles}`} label={defineLang(title.vi, title.en)} value={value} />
      })}
    </Tabs>
  </Box>
)

export default CateCommon
