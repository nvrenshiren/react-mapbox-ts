import mapboxConf from '@/assets/mapbox.conf'
import React, { useRef } from 'react'
import { Map } from 'react-mapbox-ts'
export default () => {
  const mapRef = useRef()
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
    />
  )
}
