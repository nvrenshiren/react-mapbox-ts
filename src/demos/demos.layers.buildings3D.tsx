import mapboxConf from '@/assets/mapbox.conf'
import React, { useRef } from 'react'
import { Layer, Map } from 'react-mapbox-ts'

const Demo: React.FC = () => {
  const mapRef = useRef<mapboxgl.Map>()
  return (
    <Map
      // ref={mapRef}
      ref={(map) => {
        mapRef.current = map
        window.map = map
      }}
      accessToken={mapboxConf.accessToken}
      style="mapbox://styles/mapbox/light-v10"
      zoom={15}
      center={[-74.0066, 40.7135]}
      workercount={16}
      pitch={45}
      bearing={-17.6}
    >
      <Layer
        id="3d-buildings"
        source="composite"
        sourceLayer="building"
        filter={['==', 'extrude', 'true']}
        type="fill-extrusion"
        minzoom={15}
        paint={{
          'fill-extrusion-color': '#aaa',
          'fill-extrusion-height': {
            type: 'identity',
            property: 'height'
          },
          'fill-extrusion-base': {
            type: 'identity',
            property: 'min_height'
          },
          'fill-extrusion-opacity': 0.6
        }}
      />
    </Map>
  )
}
export default Demo
