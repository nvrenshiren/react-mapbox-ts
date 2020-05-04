import { Map, RasterSource, Layer } from 'react-mapbox-ts'
import { Radio } from 'antd'
import React, { useCallback, useState, useMemo } from 'react'
import { RadioChangeEvent } from 'antd/lib/radio'
import mapboxConf from '@/assets/mapbox.conf'
import wmsData from '@/assets/wms.data'

const keys = Object.keys(wmsData)
export default () => {
  const [index, setIndex] = useState(0)
  const StyleChange = useCallback((e: RadioChangeEvent) => {
    setIndex(e.target.value)
  }, [])
  const { name, ...config } = useMemo(() => wmsData[keys[index]], [index])
  return (
    <div className="full">
      <Map
        // ref={mapRef}
        ref={(map) => {
          window.map = map
        }}
        accessToken={mapboxConf.accessToken}
        style={{
          version: 8,
          sources: {},
          layers: []
        }}
        center={mapboxConf.center}
        zoom={mapboxConf.zoom}
        maxZoom={config.maxzoom}
        minZoom={config.minzoom}
      >
        <RasterSource
          id="raster-tiles"
          option={{
            tiles: config.tiles,
            tileSize: config.tileSize || 256,
            attribution: config.attribution || ''
          }}
        >
          <Layer id="raster-layer" source="raster-tiles" type="raster" />
        </RasterSource>
      </Map>
      <div style={{ position: 'absolute', top: 8 }}>
        <Radio.Group
          defaultValue={0}
          onChange={StyleChange}
          buttonStyle="solid"
        >
          {keys.map((item, index) => {
            return (
              <Radio.Button key={`${item}-btn`} value={index}>
                {wmsData[item].name}
              </Radio.Button>
            )
          })}
        </Radio.Group>
      </div>
    </div>
  )
}
