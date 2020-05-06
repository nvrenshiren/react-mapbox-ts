import mapboxConf from '@/assets/mapbox.conf'
import { List, Space, Switch } from 'antd'
import React, { useCallback, useState } from 'react'
import { Map } from 'react-mapbox-ts'

const toggleList = {
  scrollZoom: true,
  boxZoom: true,
  dragRotate: true,
  doubleClickZoom: true,
  dragPan: true,
  keyboard: true,
  touchZoomRotate: true
}

export default () => {
  const [toggle, setToggle] = useState(toggleList)
  const onChange = useCallback(
    (open: boolean, key: string) => {
      let newConf = { ...toggle }
      newConf[key] = open
      setToggle(newConf)
    },
    [toggle]
  )
  return (
    <div className="full">
      <Map
        // ref={mapRef}
        ref={(map) => {
          window.map = map
        }}
        accessToken={mapboxConf.accessToken}
        style="mapbox://styles/mapbox/streets-v11"
        center={mapboxConf.center}
        zoom={mapboxConf.zoom}
        scrollZoom={toggle.scrollZoom}
        boxZoom={toggle.boxZoom}
        doubleClickZoom={toggle.doubleClickZoom}
        dragPan={toggle.dragPan}
        dragRotate={toggle.dragRotate}
        keyboard={toggle.keyboard}
        touchZoomRotate={toggle.touchZoomRotate}
      />
      <div
        style={{ position: 'absolute', top: 8, left: 8, background: '#fefefe' }}
      >
        <List
          bordered
          dataSource={Object.keys(toggleList)}
          renderItem={(item) => (
            <List.Item>
              <Space>
                <Switch
                  defaultChecked
                  onChange={(e) => {
                    onChange(e, item)
                  }}
                />
                {item}
              </Space>
            </List.Item>
          )}
        />
      </div>
    </div>
  )
}
