import mapboxConf from '@/assets/mapbox.conf'
import { Button, Tooltip } from 'antd'
import React, { useRef } from 'react'
import { Map, Marker } from 'react-mapbox-ts'
export default () => {
  const mapRef = useRef()
  return (
    <Map
      ref={mapRef}
      accessToken={mapboxConf.accessToken}
      style={mapboxConf.style}
      center={mapboxConf.center}
      zoom={mapboxConf.zoom}
    >
      <Marker positon={[mapboxConf.center.lon, mapboxConf.center.lat]}>
        <div id="marker-popup">
          <Tooltip
            title={<div>HTML提示框</div>}
            getPopupContainer={() => document.getElementById('marker-popup')}
          >
            <Button type="primary">HTML标注</Button>
          </Tooltip>
        </div>
      </Marker>
      <Marker draggable positon={[114.365248, 30.53786]}>
        <Button type="danger">可拖动</Button>
      </Marker>
      <Marker
        positon={[114.352309, 30.518589]}
        popup={<div>原生提示框</div>}
        popupOption={{
          closeOnClick: true,
          closeButton: false,
          closeOnMove: true,
          offset: 20
        }}
      >
        <Button type="default" shape="round">
          原生提示框
        </Button>
      </Marker>
    </Map>
  )
}
