export const setFocussedItem = (id, latitude, longitude) => ({
  type: 'SET_FOCUSSED_ITEM',
  id,
  latitude,
  longitude,
})

const focussedItem = (
  state = { id: null, latitude: null, longitude: null },
  action
) => {
  switch (action.type) {
    case 'SET_FOCUSSED_ITEM':
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
