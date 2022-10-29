import { useState, useEffect } from 'react'

interface Props {
  options: google.maps.PolylineOptions
  map: google.maps.Map
}

const Polyline = ({ options, map }: Props) => {
  const [polyline, setPolyline] = useState<google.maps.Polyline>()

  useEffect(() => {
    if (!polyline) setPolyline(new google.maps.Polyline())

    return () => {
      if (polyline) polyline.setMap(null)
    }
  }, [polyline])

  useEffect(() => {
    if (polyline) {
      polyline.setOptions(options)
      polyline.setMap(map)
    }
  }, [polyline, options, map])

  return null
}

export default Polyline
