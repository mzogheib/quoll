import moment from 'moment'
import { Action } from 'redux'

enum DateActionType {
  SetDate = 'SET_DATE',
}

interface DateAction extends Action<DateActionType> {
  date: string
}

export const setDate = (date: string) => ({
  type: DateActionType.SetDate,
  date,
})

const date = (state = moment().format('YYYY-MM-DD'), action: DateAction) => {
  switch (action.type) {
    case DateActionType.SetDate:
      return action.date
    default:
      return state
  }
}

export default date
