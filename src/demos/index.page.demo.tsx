import '@/assets/fc/fc.less'
import mapboxConf from '@/assets/mapbox.conf'
import FCPolygon from '@/fc/polygon'
import mapboxgl from 'mapbox-gl'
import React, { useRef } from 'react'
import { Layer, Map, RasterSource } from 'react-mapbox-ts'
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
        layers: [],
        glyphs: 'mapbox://fonts/mapbox/{fontstack}/{range}.pbf'
      }}
      center={[115.787221, 28.085669]}
      zoom={9}
      workercount={64}
      minZoom={9}
      maxZoom={16.5}
      maxBounds={[
        [114.46886162500175, 27.42943347819748],
        [117.10558037500186, 28.737918082206676]
      ]}
      divStyle={{
        background: `url(${require('@/assets/fc/bg.png')})`,
        transform: `translateZ(0)`
      }}
    >
      <RasterSource
        id="satellite"
        option={{
          tiles: [
            'http://t0.tianditu.gov.cn/img_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=13f2b0b67c4a2dae4b847a7bbac3e845'
          ],
          minzoom: 5,
          maxzoom: 17,
          tileSize: 256
        }}
      >
        <Layer
          id="satellite"
          type="raster"
          source="satellite"
          paint={{
            'raster-opacity': [
              'interpolate',
              ['exponential', 0.2],
              ['zoom'],
              9,
              0,
              10,
              1
            ]
          }}
          before="png2d-img"
        />
      </RasterSource>
      <FCPolygon />
    </Map>
  )
}
export default Demo
