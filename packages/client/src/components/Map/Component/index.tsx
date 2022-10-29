import { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import Polyline from '../Polyline'
import { makeBounds } from '../utilsNew'

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`

export interface Props {
  polylinesOptions?: google.maps.PolylineOptions[]
}

const MapComponent = ({ polylinesOptions }: Props) => {
  const ref = useRef<HTMLDivElement>(null)
  const [map, setMap] = useState<google.maps.Map>()

  const renderPolylines = () =>
    polylinesOptions?.map((polylineOptions, i) => (
      <Polyline key={i} options={{ ...polylineOptions, map }} />
    ))

  // Set the map on first render with a default center
  useEffect(() => {
    if (ref.current && !map) {
      const melbourne = new window.google.maps.LatLng(-37.8079033, 144.9759344)
      const options = { center: melbourne, zoom: 14, mapTypeId: 'roadmap' }

      setMap(new window.google.maps.Map(ref.current, options))
    }
  }, [ref, map])

  // Fit map to new map items
  useEffect(() => {
    if (!map) return

    const bounds = makeBounds({ polylinesOptions })

    if (!bounds.isEmpty()) map.fitBounds(bounds)
  }, [map, polylinesOptions])

  return <Wrapper ref={ref} children={renderPolylines()} />
}

export default MapComponent
