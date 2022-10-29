import { useState, useEffect } from 'react'

interface Props {
  options: google.maps.PolylineOptions
}

const Polyline = ({ options }: Props) => {
  const [polyline, setPolyline] = useState<google.maps.Polyline>()

  useEffect(() => {
    if (!polyline) setPolyline(new google.maps.Polyline())

    return () => {
      if (polyline) polyline.setMap(null)
    }
  }, [polyline])

  useEffect(() => {
    if (polyline) polyline.setOptions(options)
  }, [polyline, options])

  return null
}

export default Polyline
