import React, { useRef, useEffect } from 'react'
import { Map } from 'react-mapbox-ts'
import mapboxConf from '@/assets/mapbox.conf'
const IndexPageDemo: React.FC = () => {
  const mapRef = useRef<mapboxgl.Map>()
  useEffect(() => {}, [])
  return (
    <Map
      ref={mapRef}
      accessToken={mapboxConf.accessToken}
      style={mapboxConf.style}
      center={mapboxConf.center}
      zoom={mapboxConf.zoom}
      workercount={100}
    />
  )
}
export default IndexPageDemo
