import '@/assets/fc/fc.less'
import mapboxConf from '@/assets/mapbox.conf'
import FCPolygon from '@/fc/polygon'
import mapboxgl from 'mapbox-gl'
import React, { useRef } from 'react'
import { Layer, LoadImage, Map, RasterSource } from 'react-mapbox-ts'
const Demo: React.FC = () => {
  const mapRef = useRef<mapboxgl.Map>()
  return (
    <Map
      // ref={mapRef}
      ref={(map) => {
        window.map = map
        map.addControl(new mapboxgl.FullscreenControl())
      }}
      accessToken={mapboxConf.accessToken}
      style={{
        version: 8,
        sources: {},
        layers: []
      }}
      center={[115.787221, 28.085669]}
      zoom={9}
      workercount={32}
      minZoom={9}
      maxZoom={16.5}
      maxBounds={[
        [114.46886162500175, 27.42943347819748],
        [117.10558037500186, 28.737918082206676]
      ]}
    >
      <LoadImage name="backimg" url={require('@/assets/fc/bg.png')}>
        <Layer
          id="background"
          type="background"
          paint={{
            'background-pattern': 'backimg'
          }}
        />
      </LoadImage>
      <FCPolygon />
    </Map>
  )
}
export default Demo
