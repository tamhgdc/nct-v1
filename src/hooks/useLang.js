import { useStore } from 'store'

const useLang = (vie, eng) => {
  const [state] = useStore()
  const { lang } = state

  return lang === 'vi' ? vie : eng
}

export default useLang
