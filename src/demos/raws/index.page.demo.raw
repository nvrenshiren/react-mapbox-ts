import React, { useRef, useEffect } from 'react'
import { Map, Layer } from 'react-mapbox-ts'
import mapboxConf from '@/assets/mapbox.conf'
import { ResterDemSource } from 'react-mapbox-ts'
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
      style="mapbox://styles/mapbox/cjaudgl840gn32rnrepcb9b9g"
      center={[-119.5591, 37.715]}
      zoom={9}
      workercount={100}
    >
      <ResterDemSource
        id="dem"
        option={{
          url: 'mapbox://mapbox.terrain-rgb'
        }}
      >
        <Layer
          id="hillshading"
          source="dem"
          type="hillshade"
          before="waterway-river-canal-shadow"
        />
      </ResterDemSource>
    </Map>
  )
}
export default Demo
