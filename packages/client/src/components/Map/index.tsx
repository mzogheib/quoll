import { Wrapper, Status } from '@googlemaps/react-wrapper'

import MapPlaceholder from './Placeholder'
import MapComponent, { Props } from './Component'

const apiKey = process.env.REACT_APP_GOOGLE_MAPS_KEY

const Map = (props: Props) => {
  if (!apiKey) {
    return <MapPlaceholder text="Hmm could not load map - missing API key" />
  }

  const render = (status: Status) => {
    switch (status) {
      case Status.LOADING:
        return <MapPlaceholder text="Loading" />
      case Status.SUCCESS:
        return <MapComponent {...props} />
      case Status.FAILURE:
      default:
        return <MapPlaceholder text="Hmm could not load map" />
    }
  }

  return <Wrapper apiKey={apiKey} libraries={['geometry']} render={render} />
}

export default Map
