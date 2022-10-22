import { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`

export interface Props {}

const MapComponent = () => {
  const ref = useRef<HTMLDivElement>(null)
  const [map, setMap] = useState<google.maps.Map>()

  useEffect(() => {
    if (ref.current && !map) {
      const melbourne = new window.google.maps.LatLng(-37.8079033, 144.9759344)
      const options = { center: melbourne, zoom: 14, mapTypeId: 'roadmap' }

      setMap(new window.google.maps.Map(ref.current, options))
    }
  }, [ref, map])

  return <Wrapper ref={ref} />
}

export default MapComponent
