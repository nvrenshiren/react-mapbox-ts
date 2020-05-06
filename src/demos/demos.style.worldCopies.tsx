import { Map } from 'react-mapbox-ts'
import { Radio } from 'antd'
import React, { useCallback, useState } from 'react'
import { RadioChangeEvent } from 'antd/lib/radio'
import mapboxConf from '@/assets/mapbox.conf'
const defaultValue = 1
export default () => {
  const [value, setValue] = useState(!!defaultValue)
  const ValueChange = useCallback((e: RadioChangeEvent) => {
    setValue(!!e.target.value)
  }, [])
  return (
    <div className="full">
      <Map
        // ref={mapRef}
        ref={(map) => {
          window.map = map
        }}
        accessToken={mapboxConf.accessToken}
        style="mapbox://styles/mapbox/streets-v11"
        renderWorldCopies={!!value}
        center={mapboxConf.center}
        zoom={mapboxConf.zoom}
      />
      <div style={{ position: 'absolute', top: 0 }}>
        <Radio.Group
          defaultValue={defaultValue}
          onChange={ValueChange}
          buttonStyle="solid"
        >
          <Radio.Button value={1}>True</Radio.Button>
          <Radio.Button value={0}>False</Radio.Button>
        </Radio.Group>
      </div>
    </div>
  )
}
