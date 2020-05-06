import React, { useRef, useEffect } from 'react'
import { Map, GeoJSONSource, LoadImage, Layer } from 'react-mapbox-ts'
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
      center={[-30, -25]}
      zoom={1}
      workercount={100}
    >
      <LoadImage
        name="pattern"
        url="https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Cat_silhouette.svg/64px-Cat_silhouette.svg.png"
      >
        <GeoJSONSource
          id="source"
          option={{
            data: {
              type: 'Feature',
              properties: {},
              geometry: {
                type: 'Polygon',
                coordinates: [
                  [
                    [-30, -25],
                    [-30, 35],
                    [30, 35],
                    [30, -25],
                    [-30, -25]
                  ]
                ]
              }
            }
          }}
        >
          <Layer
            id="pattern-layer"
            type="fill"
            source="source"
            paint={{
              'fill-pattern': 'pattern'
            }}
          />
        </GeoJSONSource>
      </LoadImage>
    </Map>
  )
}
export default Demo
