import React from 'react'
import { Map } from 'react-mapbox-ts'
import mapboxConf from '@/assets/mapbox.conf'
const IndexPageDemo: React.FC = () => {
  return (
    <Map
      accessToken={mapboxConf.accessToken}
      style={mapboxConf.style}
      center={mapboxConf.center}
      zoom={mapboxConf.zoom}
    />
  )
}
export default IndexPageDemo
