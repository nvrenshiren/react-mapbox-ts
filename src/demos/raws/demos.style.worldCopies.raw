import { Map } from '../../react-mapbox-ts/src/index'
import { Radio } from 'antd'
import React, { useCallback, useState } from 'react'
import { RadioChangeEvent } from 'antd/lib/radio'
const defaultValue = 1
export default () => {
  const [value, setValue] = useState(!!defaultValue)
  const ValueChange = useCallback((e: RadioChangeEvent) => {
    setValue(!!e.target.value)
  }, [])
  return (
    <div className="full">
      <Map
        accessToken="pk.eyJ1IjoiMTg2MjcwMjE1NDMiLCJhIjoiY2s4dHh3dnJ6MDBlMDNmb2l2bDQ4aDF1YSJ9.f6-80XxhwYLNJRDdntMF2w"
        style="mapbox://styles/mapbox/streets-v11"
        renderWorldCopies={!!value}
      />
      <div style={{ position: 'absolute', top: 8 }}>
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
