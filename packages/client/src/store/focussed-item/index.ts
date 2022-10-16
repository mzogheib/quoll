import { Action } from 'redux'
import { RootState } from '..'

enum FocussedItemActionType {
  Set = 'SET_FOCUSSED_ITEM',
}

interface SetFocussedItemAction extends Action<FocussedItemActionType.Set> {
  id?: string
  latitude?: number
  longitude?: number
}

export const setFocussedItem = (
  id?: string,
  latitude?: number,
  longitude?: number
): SetFocussedItemAction => ({
  type: FocussedItemActionType.Set,
  id,
  latitude,
  longitude,
})

export const selectFocussedItem = (state: RootState) => state.focussedItem

const defaultState = { id: null, latitude: null, longitude: null }

type FocussedItemAction = SetFocussedItemAction

const focussedItem = (state = defaultState, action: FocussedItemAction) => {
  switch (action.type) {
    case FocussedItemActionType.Set:
      return {
        id: action.id,
        latitude: action.latitude,
        longitude: action.longitude,
      }
    default:
      return state
  }
}

export default focussedItem
