import moment from 'moment'

export const convertMoney = money => {
  return parseInt(money ?? 0).toLocaleString('en')
}

export const formatDate = dateString => {
  return moment(new Date(dateString)).format('L')
}
