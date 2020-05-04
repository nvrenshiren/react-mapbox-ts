import mapboxConf from '@/assets/mapbox.conf'
import mapboxgl from 'mapbox-gl'
import React, { useCallback, useRef, useState } from 'react'
import { GeoJSONSource, Layer, Map } from 'react-mapbox-ts'

const Demo: React.FC = () => {
  const mapRef = useRef<mapboxgl.MapBoxPlus>()
  let animation = useRef<number>().current
  const [data, setData] = useState<any>()
  const radius = 20
  const pointOnCircle = useCallback((angle: number) => {
    return {
      type: 'Point',
      coordinates: [Math.cos(angle) * radius, Math.sin(angle) * radius]
    }
  }, [])
  const animate = useCallback(() => {
    function animateLine(timestamp?: number) {
      setData(pointOnCircle(timestamp / 1000))
      requestAnimationFrame(animateLine)
    }
    animateLine()
  }, [])

  return (
    <Map
      // ref={mapRef}
      ref={(map) => {
        window.map = map
        mapRef.current = map
      }}
      accessToken={mapboxConf.accessToken}
      style="mapbox://styles/mapbox/streets-v11"
      zoom={2}
      center={[0, 0]}
      onLoad={() => {
        animate()
      }}
    >
      <GeoJSONSource
        id="point"
        option={{
          data: data || pointOnCircle(0)
        }}
      >
        <Layer
          id="point"
          source="point"
          type="circle"
          paint={{
            'circle-radius': 10,
            'circle-color': '#007cbf'
          }}
        />
      </GeoJSONSource>
    </Map>
  )
}
export default Demo
