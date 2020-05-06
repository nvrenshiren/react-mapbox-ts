import React, { useRef, useEffect, useState, useCallback } from 'react'
import { Map, GeoJSONSource, Layer } from 'react-mapbox-ts'
import mapboxConf from '@/assets/mapbox.conf'
import { LngLatLike, AnimationOptions } from 'mapbox-gl'
import { Space, Select, Slider, Switch, Input, Typography, Button } from 'antd'
const { Option } = Select
const { Text } = Typography
const easingFunctions = {
  easeInCubic: (t: number) => {
    return t * t * t
  },
  easeOutQuint: (t: number) => {
    return 1 - Math.pow(1 - t, 5)
  },
  easeInOutCirc: (t: number) => {
    return t < 0.5
      ? (1 - Math.sqrt(1 - Math.pow(2 * t, 2))) / 2
      : (Math.sqrt(1 - Math.pow(-2 * t + 2, 2)) + 1) / 2
  },
  easeOutBounce: (t: number) => {
    var n1 = 7.5625
    var d1 = 2.75
    if (t < 1 / d1) {
      return n1 * t * t
    } else if (t < 2 / d1) {
      return n1 * (t -= 1.5 / d1) * t + 0.75
    } else if (t < 2.5 / d1) {
      return n1 * (t -= 2.25 / d1) * t + 0.9375
    } else {
      return n1 * (t -= 2.625 / d1) * t + 0.984375
    }
  }
}
const Demo: React.FC = () => {
  const mapRef = useRef<mapboxgl.Map>()
  const [center, setCenter] = useState<LngLatLike>([-95, 40])
  const [aniConf, setAniConf] = useState<AnimationOptions>({
    duration: 1000,
    easing: easingFunctions['easeInCubic'],
    offset: [1, 1],
    animate: true,
    essential: true
  })
  useEffect(() => {}, [])
  const changeConf = useCallback(
    (key: string, value) => {
      let newConfi = { ...aniConf }
      newConfi[key] = value
      setAniConf(newConfi)
    },
    [aniConf]
  )
  return (
    <div className="full">
      <Map
        // ref={mapRef}
        ref={(map) => {
          window.map = map
        }}
        accessToken={mapboxConf.accessToken}
        style={mapboxConf.style}
        center={center}
        zoom={mapboxConf.zoom}
        animationOptions={aniConf}
        workercount={100}
      >
        <GeoJSONSource
          id="center"
          option={{
            data: {
              type: 'Point',
              coordinates: center
            }
          }}
        >
          <Layer
            id="center"
            source="center"
            type="symbol"
            layout={{
              'icon-image': 'marker-15',
              'text-field': `Center: [${center[0].toFixed(
                1
              )},${center[1].toFixed(1)}]`,
              'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
              'text-offset': [0, 0.6],
              'text-anchor': 'top'
            }}
            paint={{
              'text-color': 'red'
            }}
          />
        </GeoJSONSource>
      </Map>
      <div
        style={{
          position: 'absolute',
          left: 8,
          top: 8,
          padding: 8,
          background: '#fff'
        }}
      >
        <Space direction="vertical">
          选择动画函数
          <Select
            defaultValue="easeInCubic"
            onChange={(v) => {
              changeConf('easing', easingFunctions[v])
            }}
            style={{ width: 150 }}
            size="small"
          >
            {Object.keys(easingFunctions).map((key) => (
              <Option value={key} key={`easingFunctions-${key}`}>
                {key}
              </Option>
            ))}
          </Select>
          设置动画持续时间(单位:秒)
          <Slider
            defaultValue={1}
            min={0}
            max={10}
            step={0.5}
            onChange={(v) => {
              changeConf('duration', Number(v) * 1000)
            }}
          />
          相机动画开启
          <Switch
            defaultChecked
            size="small"
            onChange={(checked) => {
              changeConf('animate', !!checked)
            }}
          />
          <Input
            addonBefore="Offset-X"
            type="number"
            defaultValue={1}
            size="small"
            onChange={(e) => {
              let newOffset = JSON.parse(JSON.stringify(aniConf.offset))
              newOffset[0] = Number(e.target.value)
              changeConf('offset', newOffset)
            }}
          />
          <Input
            addonBefore="Offset-Y"
            type="number"
            defaultValue={1}
            size="small"
            onChange={(e) => {
              let newOffset = JSON.parse(JSON.stringify(aniConf.offset))
              newOffset[1] = Number(e.target.value)
              changeConf('offset', newOffset)
            }}
          />
          <Text code>偏移量可以为负</Text>
          <Button
            type="primary"
            size="small"
            onClick={() => {
              const center: LngLatLike = [
                -95 + (Math.random() - 0.5) * 20,
                40 + (Math.random() - 0.5) * 20
              ]
              setCenter(center)
            }}
          >
            测试动画
          </Button>
        </Space>
      </div>
    </div>
  )
}
export default Demo
