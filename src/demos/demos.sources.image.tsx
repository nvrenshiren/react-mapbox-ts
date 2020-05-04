import mapboxConf from '@/assets/mapbox.conf'
import React, { useRef } from 'react'
import { ImageSource, Layer, Map, VectorSource } from 'react-mapbox-ts'

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
      style={{
        version: 8,
        sprite: 'mapbox://sprites/mapbox/dark-v10',
        glyphs: 'mapbox://fonts/mapbox/{fontstack}/{range}.pbf',
        sources: {},
        layers: []
      }}
      zoom={5}
      maxZoom={6}
      minZoom={4}
      center={[-75.789, 41.874]}
      workercount={16}
    >
      <Layer
        id="background"
        type="background"
        paint={{
          'background-color': '#111'
        }}
      />
      <ImageSource
        id="overlay"
        option={{
          url: 'https://docs.mapbox.com/mapbox-gl-js/assets/radar.gif',
          coordinates: [
            [-80.425, 46.437],
            [-71.516, 46.437],
            [-71.516, 37.936],
            [-80.425, 37.936]
          ]
        }}
      >
        <Layer
          id="overlay"
          source="overlay"
          type="raster"
          paint={{
            'raster-opacity': 0.85
          }}
        />
      </ImageSource>
      <VectorSource
        id="mapbox"
        option={{ url: 'mapbox://mapbox.mapbox-streets-v8' }}
      >
        <Layer
          id="water"
          source="mapbox"
          sourceLayer="water"
          type="fill"
          paint={{
            'fill-color': '#2c2c2c'
          }}
        />
        <Layer
          id="boundaries"
          source="mapbox"
          sourceLayer="admin"
          type="line"
          paint={{
            'line-color': '#797979',
            'line-dasharray': [2, 2, 6, 2]
          }}
          filter={['all', ['==', 'maritime', 0]]}
        />
        <Layer
          id="cities"
          source="mapbox"
          sourceLayer="place_label"
          type="symbol"
          paint={{
            'text-color': '#969696',
            'text-halo-width': 2,
            'text-halo-color': 'rgba(0, 0, 0, 0.85)'
          }}
          layout={{
            'text-field': '{name_en}',
            'text-font': ['DIN Offc Pro Bold', 'Arial Unicode MS Bold'],
            'text-size': ['interpolate', ['linear'], ['zoom'], 4, 9, 6, 12]
          }}
        />
        <Layer
          id="states"
          source="mapbox"
          sourceLayer="place_label"
          type="symbol"
          paint={{
            'text-color': '#969696',
            'text-halo-width': 2,
            'text-halo-color': 'rgba(0, 0, 0, 0.85)'
          }}
          layout={{
            'text-transform': 'uppercase',
            'text-field': '{name_en}',
            'text-font': ['DIN Offc Pro Bold', 'Arial Unicode MS Bold'],
            'text-letter-spacing': 0.15,
            'text-max-width': 7,
            'text-size': ['interpolate', ['linear'], ['zoom'], 4, 10, 6, 14]
          }}
          filter={['==', ['get', 'class'], 'state']}
        />
      </VectorSource>
    </Map>
  )
}
export default Demo
