import mapboxConf from '@/assets/mapbox.conf'
import mapboxgl from 'mapbox-gl'
import React, { useRef } from 'react'
import { GeoJSONSource, Layer, Map } from 'react-mapbox-ts'

const Demo: React.FC = () => {
  const mapRef = useRef<mapboxgl.MapBoxPlus>()
  return (
    <Map
      // ref={mapRef}
      ref={(map) => {
        window.map = map
        mapRef.current = map
      }}
      accessToken={mapboxConf.accessToken}
      style="mapbox://styles/mapbox/streets-v11"
      zoom={16}
      center={[-87.61694, 41.86625]}
      pitch={40}
      bearing={20}
      antialias={true}
    >
      <GeoJSONSource
        id="floorplan"
        option={{
          data:
            'https://docs.mapbox.com/mapbox-gl-js/assets/indoor-3d-map.geojson'
        }}
      >
        <Layer
          id="room-extrusion"
          type="fill-extrusion"
          source="floorplan"
          paint={{
            'fill-extrusion-color': ['get', 'color'],
            'fill-extrusion-height': ['get', 'height'],
            'fill-extrusion-base': ['get', 'base_height'],
            'fill-extrusion-opacity': 0.5
          }}
        />
      </GeoJSONSource>
    </Map>
  )
}
export default Demo
