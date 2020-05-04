import mapboxConf from '@/assets/mapbox.conf'
import React, { useRef, useState, useEffect } from 'react'
import { Map, VectorSource, Layer } from 'react-mapbox-ts'

const Demo: React.FC = () => {
  const mapRef = useRef<mapboxgl.Map>()
  const [zoom, setZoom] = useState(13)
  useEffect(() => {
    setTimeout(() => {
      setZoom(9)
    }, 5000)
  })
  return (
    <Map
      // ref={mapRef}
      ref={(map) => {
        window.map = map
      }}
      accessToken={mapboxConf.accessToken}
      style="mapbox://styles/mapbox/light-v10"
      zoom={11}
      center={[-122.447303, 37.753574]}
      workercount={16}
      minZoom={10}
    >
      <VectorSource
        id="mapbox-terrain"
        option={{
          url: 'mapbox://mapbox.mapbox-terrain-v2',
          minzoom: zoom
        }}
      >
        <Layer
          id="terrain-data"
          type="line"
          source="mapbox-terrain"
          sourceLayer="contour"
          layout={{
            'line-join': 'round',
            'line-cap': 'round'
          }}
          paint={{
            'line-color': '#ff69b4',
            'line-width': 1
          }}
        />
      </VectorSource>
    </Map>
  )
}
export default Demo
