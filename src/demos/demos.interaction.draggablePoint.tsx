import React, { useRef, useState, useCallback, useEffect } from 'react'
import { Map, GeoJSONSource, Layer } from 'react-mapbox-ts'
import mapboxConf from '@/assets/mapbox.conf'
import { message } from 'antd'
export default () => {
  const mapRef = useRef<mapboxgl.MapBoxPlus>()
  const [data, setData] = useState({
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [0, 0]
        }
      }
    ]
  })
  const onMove = useCallback(
    (e: mapboxgl.MapMouseEvent & mapboxgl.EventData) => {
      let newData = { ...data }
      newData.features[0].geometry.coordinates = [e.lngLat.lng, e.lngLat.lat]
      setData(newData)
    },
    [data]
  )
  const onUp = useCallback(
    (e: mapboxgl.MapMouseEvent & mapboxgl.EventData) => {
      message.info(`Longitude: '${e.lngLat.lng}' Latitude: '${e.lngLat.lat}'`)
      mapRef.current.off('mousemove', onMove)
      mapRef.current.off('touchmove', onMove)
    },
    [data]
  )
  useEffect(() => {
    return () => {
      message.destroy()
    }
  }, [])
  const bindEvent = useCallback(
    (e: mapboxgl.MapLayerTouchEvent | mapboxgl.MapLayerMouseEvent) => {
      if ('points' in e) {
        if (e.points.length !== 1) return
      }
      e.preventDefault()
      mapRef.current.on('mousemove', onMove)
      mapRef.current.once('mouseup', onUp)
    },
    []
  )
  return (
    <Map
      ref={(map) => {
        mapRef.current = map
        window.map = map
      }}
      accessToken={mapboxConf.accessToken}
      style={mapboxConf.style}
      center={[0, 0]}
      zoom={2}
      onMouseMove={() => {}}
      onMouseUp={() => {}}
    >
      <GeoJSONSource
        id="point"
        option={{
          data: data as any
        }}
      >
        <Layer
          id="point"
          source="point"
          type="circle"
          paint={{
            'circle-radius': 10,
            'circle-color': '#3887be'
          }}
          onMouseDown={bindEvent}
          onTouchStart={bindEvent}
        />
      </GeoJSONSource>
    </Map>
  )
}
