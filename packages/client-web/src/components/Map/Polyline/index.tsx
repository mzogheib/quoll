import { useState, useEffect } from 'react'

interface Props {
  options: google.maps.PolylineOptions
  map: google.maps.Map
  onClick?: (event: google.maps.MapMouseEvent) => void
}

const Polyline = ({ options, map, onClick }: Props) => {
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
      if (onClick) polyline.addListener('click', onClick)
      polyline.setMap(map)
    }
  }, [polyline, options, map, onClick])

  return null
}

export default Polyline
