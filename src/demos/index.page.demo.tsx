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
      dragPan={false}
      dragRotate={false}
      scrollZoom={false}
      minZoom={5}
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
          before="raster-layer"
        />
      </LoadImage>
      <RasterSource
        id="raster-tiles"
        option={{
          tiles: [
            '//t0.tianditu.com/DataServer?T=img_w&X={x}&Y={y}&L={z}&tk=b03e859b754a2528f0690d31f919d6c8'
          ],
          tileSize: 256,
          attribution: '国家基础地理信息中心'
        }}
      >
        <Layer
          id="raster-layer"
          source="raster-tiles"
          type="raster"
          maxzoom={17}
          minzoom={10}
        />
      </RasterSource>
      <FCPolygon />
    </Map>
  )
}
export default Demo
