import React, { useRef } from 'react'
import { Map, Marker } from 'react-mapbox-ts'
import mapboxConf from '@/assets/mapbox.conf'

export default () => {
  const mapRef = useRef()
  return (
    <Map
      ref={mapRef}
      accessToken={mapboxConf.accessToken}
      style={mapboxConf.style}
      center={mapboxConf.center}
      zoom={mapboxConf.zoom}
    >
      <Marker positon={[mapboxConf.center.lon, mapboxConf.center.lat]} />
    </Map>
  )
}