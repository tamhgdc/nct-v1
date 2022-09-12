import { getHome, getChart } from 'nhaccuatui-api-full'
import { getRealtimeData } from 'services/Chart/Realtime'
import { bg_1, bg_2, bg_3 } from 'images'

export const fetchHomeData = async () => {
  let homeData = await getHome()
  let { ranking: usukRanking } = await getChart({ category: 'au-my' })
  let { ranking: kpopRanking } = await getChart({ category: 'nhac-han' })
  const top3 = await getRealtimeData(3)

  if (homeData) {
    homeData.ranking.region = {
      vi: 'Việt Nam',
      en: 'V-POP',
    }
    homeData.ranking.bgImage = bg_1
    homeData.ranking.category = 'nhac-viet'
    homeData.top3 = top3
  }

  if (usukRanking) {
    usukRanking.region = {
      vi: 'Âu Mỹ',
      en: 'US-UK',
    }
    usukRanking.bgImage = bg_2
    usukRanking.category = 'au-my'
  }

  if (kpopRanking) {
    kpopRanking.region = {
      vi: 'Hàn Quốc',
      en: 'K-POP',
    }
    kpopRanking.bgImage = bg_3
    kpopRanking.category = 'nhac-han'
  }

  return { ...homeData, usukRanking, kpopRanking }
}
