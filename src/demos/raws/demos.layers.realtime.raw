import mapboxConf from '@/assets/mapbox.conf'
import { LngLatLike } from 'mapbox-gl'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { GeoJSONSource, Layer, Map } from 'react-mapbox-ts'

interface DataParams {
  data: any
  size: number
  center: LngLatLike
}
const Demo: React.FC = () => {
  const mapRef = useRef<mapboxgl.Map>()
  const url = 'https://wanderdrone.appspot.com/'
  const [data, setData] = useState<DataParams>({
    data: null,
    size: 1,
    center: [-114.36500971520232, -8.13046865403699]
  })
  const intRef = useRef<NodeJS.Timeout>()
  const sourceRef = useRef<mapboxgl.GeoJSONSource>()
  const layerRef = useRef<mapboxgl.Layer>()
  useEffect(() => {
    intRef.current = setInterval(WsetInterval, 3000)
    return () => {
      clearInterval(intRef.current)
    }
  }, [])
  const WsetInterval = useCallback(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setData({
          data: data,
          center: data.geometry.coordinates,
          size: Math.random() * 10 + 1
        })
      })
  }, [])
  return (
    <Map
      // ref={mapRef}
      ref={(map) => {
        window.map = map
      }}
      flyToOptions={{ speed: 0.8 }}
      accessToken={mapboxConf.accessToken}
      style={mapboxConf.style}
      center={data.center}
      zoom={4}
      workercount={16}
    >
      <GeoJSONSource
        ref={sourceRef}
        id="drone"
        option={{ data: data.data || url }}
      >
        <Layer
          ref={layerRef}
          id="layer-id"
          type="symbol"
          source="drone"
          layout={{
            'icon-image': 'rocket-15',
            'icon-size': data.size
          }}
        />
      </GeoJSONSource>
    </Map>
  )
}
export default Demo
