import mapboxConf from '@/assets/mapbox.conf'
import mapboxgl from 'mapbox-gl'
import React, { useRef, useCallback, useState } from 'react'
import { Map, GeoJSONSource, Layer } from 'react-mapbox-ts'

const Demo: React.FC = () => {
  const mapRef = useRef<mapboxgl.MapBoxPlus>()
  const animation = useRef<number>()
  const [data, setData] = useState<any>([[0, 0]])
  const dataRef = useRef([[0, 0]])
  const resetTime = useRef(false)
  const startTime = useRef(0)
  const progress = useRef(0)
  const animate = useCallback(() => {
    const speedFactor = 30
    function animateLine(timestamp?: number) {
      if (resetTime.current) {
        startTime.current = performance.now() - progress.current
        resetTime.current = false
      } else {
        progress.current = timestamp - startTime.current
      }
      if (progress.current > speedFactor * 360) {
        startTime.current = timestamp
        dataRef.current = []
      } else {
        var x = progress.current / speedFactor
        var y = Math.sin((x * Math.PI) / 90) * 40
        dataRef.current.push([x, y])
        setData([...dataRef.current])
      }
      animation.current = requestAnimationFrame(animateLine)
    }
    animateLine()
  }, [])
  const onClick = useCallback(() => {
    if (animation.current) {
      cancelAnimationFrame(animation.current)
      animation.current = null
    } else {
      resetTime.current = true
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
      onLoad={() => {
        startTime.current = performance.now()
        animate()
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
