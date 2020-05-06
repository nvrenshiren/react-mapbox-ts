import mapboxConf from '@/assets/mapbox.conf'
import { Slider } from 'antd'
import mapboxgl from 'mapbox-gl'
import React, { useCallback, useRef, useState } from 'react'
import { Layer, Map, RasterSource } from 'react-mapbox-ts'

const Demo: React.FC = () => {
  const mapRef = useRef<mapboxgl.MapBoxPlus>()
  const [opacity, setOpacity] = useState(40)
  const onChange = useCallback(
    (value: number) => {
      setOpacity(value)
    },
    [opacity]
  )
  return (
    <div className="full">
      <Map
        // ref={mapRef}
        ref={(map) => {
          window.map = map
          mapRef.current = map
        }}
        accessToken={mapboxConf.accessToken}
        style="mapbox://styles/mapbox/dark-v9"
        zoom={10}
        center={[-87.6321, 41.8362]}
        minZoom={9}
        maxZoom={13}
      >
        <RasterSource
          id="chicago"
          option={{
            url: 'mapbox://mapbox.u8yyzaor'
          }}
        >
          <Layer
            id="chicago"
            source="chicago"
            type="raster"
            paint={{
              'raster-opacity': opacity / 100
            }}
          />
        </RasterSource>
      </Map>
      <div style={{ position: 'absolute', top: 16, width: '60%', left: '20%' }}>
        <Slider
          min={0}
          max={100}
          step={10}
          value={opacity}
          defaultValue={40}
          onChange={onChange}
        />
      </div>
    </div>
  )
}
export default Demo
