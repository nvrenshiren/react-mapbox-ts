import React, { useRef, useEffect } from 'react'
import { Map } from 'react-mapbox-ts'
import mapboxConf from '@/assets/mapbox.conf'
const Demo: React.FC = () => {
  const mapRef = useRef<mapboxgl.Map>()
  useEffect(() => {}, [])
  return (
    <Map
      // ref={mapRef}
      ref={(map) => {
        window.map = map
      }}
      accessToken={mapboxConf.accessToken}
      style={mapboxConf.style}
      center={mapboxConf.center}
      zoom={mapboxConf.zoom}
      workercount={100}
    />
  )
}
export default Demo
