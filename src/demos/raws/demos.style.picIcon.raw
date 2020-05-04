import mapboxConf from '@/assets/mapbox.conf'
import React, { useRef } from 'react'
import { GeoJSONSource, Layer, LoadImage, Map } from 'react-mapbox-ts'

const Demo: React.FC = () => {
  const mapRef = useRef<mapboxgl.MapBoxPlus>()
  return (
    <Map
      // ref={mapRef}
      ref={(map) => {
        window.map = map
      }}
      accessToken={mapboxConf.accessToken}
      style={mapboxConf.style}
    >
      <LoadImage
        name="cat"
        url="https://upload.wikimedia.org/wikipedia/commons/7/7c/201408_cat.png"
        options={{
          pixelRatio: 2
        }}
      >
        <GeoJSONSource
          id="point"
          option={{
            data: {
              type: 'FeatureCollection',
              features: [
                {
                  type: 'Feature',
                  geometry: {
                    type: 'Point',
                    coordinates: [0, 0]
                  }
                },
                {
                  type: 'Feature',
                  geometry: {
                    type: 'Point',
                    coordinates: [5, 5]
                  }
                }
              ]
            }
          }}
        >
          <Layer
            id="points"
            type="symbol"
            source="point"
            layout={{
              'icon-image': 'cat',
              'icon-size': 0.25
            }}
          />
        </GeoJSONSource>
      </LoadImage>
    </Map>
  )
}
export default Demo
