import moment from 'moment'
import { getTop20 } from 'api'

export const getWeek = () => moment().week() - 2

export const getYear = () => new Date().getFullYear()

export const getRankDay = (week) => {
  var curr = new Date() // get current date
  var first = curr.getDate() - curr.getDay() // First day is the day of the month - the day of the week
  var last = first + 6 // last day is the first day + 6

  var firstday = new Date(curr.setDate(first)).toUTCString()
  var lastday = new Date(curr.setDate(last)).toUTCString()
  return { firstday, lastday }
}

export const getTop20Data = async (category, type, week, year) => {
  try {
    const data = await getTop20(category, type, week, year)
    
    return data.ranking ? data.ranking[type] : []
  } catch (error) {
    console.log(error)
  }
}