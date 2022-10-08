import { Action } from 'redux'

enum FocussedItemActionType {
  Set = 'SET_FOCUSSED_ITEM',
}

interface FocussedItemAction extends Action<FocussedItemActionType> {
  id: string
  latitude: number
  longitude: number
}

export const setFocussedItem = (
  id: string,
  latitude: number,
  longitude: number
) => ({
  type: FocussedItemActionType.Set,
  id,
  latitude,
  longitude,
})

const focussedItem = (
  state = { id: null, latitude: null, longitude: null },
  action: FocussedItemAction
) => {
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
