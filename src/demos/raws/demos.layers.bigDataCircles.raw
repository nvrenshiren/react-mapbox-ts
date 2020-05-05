import React, { useRef, useEffect } from 'react'
import { Map, VectorSource, Layer } from 'react-mapbox-ts'
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
      center={[-122.447303, 37.753574]}
      zoom={12}
      workercount={100}
    >
      <VectorSource
        id="ethnicity"
        option={{
          url: 'mapbox://examples.8fgz4egr'
        }}
      >
        <Layer
          id="population"
          type="circle"
          source="ethnicity"
          sourceLayer="sf2010"
          paint={{
            'circle-radius': {
              base: 1.75,
              stops: [
                [12, 2],
                [22, 180]
              ]
            },
            'circle-color': [
              'match',
              ['get', 'ethnicity'],
              'White',
              '#fbb03b',
              'Black',
              '#223b53',
              'Hispanic',
              '#e55e5e',
              'Asian',
              '#3bb2d0',
              '#ccc'
            ]
          }}
        />
      </VectorSource>
    </Map>
  )
}
export default Demo
