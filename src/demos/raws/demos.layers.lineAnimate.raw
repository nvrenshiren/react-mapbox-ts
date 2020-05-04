import mapboxConf from '@/assets/mapbox.conf'
import mapboxgl from 'mapbox-gl'
import React, { useRef, useCallback, useState } from 'react'
import { Map, GeoJSONSource, Layer } from 'react-mapbox-ts'

const Demo: React.FC = () => {
  const mapRef = useRef<mapboxgl.MapBoxPlus>()
  let animation = useRef<number>().current
  const [data, setData] = useState<any>([[0, 0]])
  let dataRef = useRef([[0, 0]]).current
  let resetTime = useRef(false).current
  let startTime = useRef(0).current
  let progress = useRef(0).current
  const animate = useCallback(() => {
    const speedFactor = 30
    function animateLine(timestamp?: number) {
      if (resetTime) {
        startTime = performance.now() - progress
        resetTime = false
      } else {
        progress = timestamp - startTime
      }
      if (progress > speedFactor * 360) {
        startTime = timestamp
        dataRef = []
      } else {
        var x = progress / speedFactor
        var y = Math.sin((x * Math.PI) / 90) * 40
        dataRef.push([x, y])
        setData([...dataRef])
      }
      animation = requestAnimationFrame(animateLine)
    }
    animateLine()
  }, [])
  const onClick = useCallback(() => {
    if (animation) {
      cancelAnimationFrame(animation)
      animation = null
    } else {
      resetTime = true
      animate()
    }
  }, [])
  return (
    <Map
      // ref={mapRef}
      ref={(map) => {
        window.map = map
        mapRef.current = map
      }}
      onClick={onClick}
      accessToken={mapboxConf.accessToken}
      style="mapbox://styles/mapbox/streets-v11"
      zoom={0.5}
      center={[0, 0]}
    >
      <GeoJSONSource
        id="line"
        option={{
          data: {
            type: 'FeatureCollection',
            features: [
              {
                type: 'Feature',
                geometry: {
                  type: 'LineString',
                  coordinates: data
                }
              }
            ]
          }
        }}
      >
        <Layer
          id="line-animation"
          source="line"
          type="line"
          paint={{
            'line-color': '#ed6498',
            'line-width': 5,
            'line-opacity': 0.8
          }}
          layout={{
            'line-cap': 'round',
            'line-join': 'round'
          }}
        />
      </GeoJSONSource>
    </Map>
  )
}
export default Demo
