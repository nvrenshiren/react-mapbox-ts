import { Map } from 'react-mapbox-ts'
import { Radio } from 'antd'
import React, { useCallback, useState } from 'react'
import { RadioChangeEvent } from 'antd/lib/radio'
import mapboxConf from '@/assets/mapbox.conf'

const defaultValue = 'streets-v11'
export default () => {
  const [style, setStyle] = useState(defaultValue)
  const StyleChange = useCallback((e: RadioChangeEvent) => {
    setStyle(e.target.value)
  }, [])
  return (
    <div className="full">
      <Map
        // ref={mapRef}
        ref={(map) => {
          window.map = map
        }}
        accessToken={mapboxConf.accessToken}
        style={`mapbox://styles/mapbox/${style}`}
        center={mapboxConf.center}
        zoom={mapboxConf.zoom}
      />
      <div style={{ position: 'absolute', top: 0 }}>
        <Radio.Group
          defaultValue={defaultValue}
          onChange={StyleChange}
          buttonStyle="solid"
        >
          <Radio.Button value="streets-v11">Streets</Radio.Button>
          <Radio.Button value="light-v10">Light</Radio.Button>
          <Radio.Button value="dark-v10">Dark</Radio.Button>
          <Radio.Button value="outdoors-v11">Outdoors</Radio.Button>
          <Radio.Button value="satellite-v9">Satellite</Radio.Button>
        </Radio.Group>
      </div>
    </div>
  )
}
