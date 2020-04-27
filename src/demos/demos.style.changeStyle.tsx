import { Map } from '../../react-mapbox-ts/src/index'
import { Radio } from 'antd'
import React, { useCallback, useState } from 'react'
import { RadioChangeEvent } from 'antd/lib/radio'
const defaultValue = 'streets-v11'
export default () => {
  const [style, setStyle] = useState(defaultValue)
  const StyleChange = useCallback((e: RadioChangeEvent) => {
    setStyle(e.target.value)
  }, [])
  return (
    <div className="full">
      <Map
        accessToken="pk.eyJ1IjoiMTg2MjcwMjE1NDMiLCJhIjoiY2s4dHh3dnJ6MDBlMDNmb2l2bDQ4aDF1YSJ9.f6-80XxhwYLNJRDdntMF2w"
        style={`mapbox://styles/mapbox/${style}`}
        renderChildrenInPortal
      />
      <div style={{ position: 'absolute', top: 8 }}>
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
