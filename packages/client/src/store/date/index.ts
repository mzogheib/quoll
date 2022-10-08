import moment from 'moment'
import { Action } from 'redux'

enum DateActionType {
  Set = 'SET_DATE',
}

interface SetDateAction extends Action<DateActionType.Set> {
  date: string
}

export const setDate = (date: string) => ({
  type: DateActionType.Set,
  date,
})

const defaultState = moment().format('YYYY-MM-DD')

type DateAction = SetDateAction

const date = (state = defaultState, action: DateAction) => {
  switch (action.type) {
    case DateActionType.Set:
      return action.date
    default:
      return state
  }
}

export default date
