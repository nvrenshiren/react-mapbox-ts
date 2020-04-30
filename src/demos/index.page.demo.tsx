import React, { useRef, useEffect, useCallback, useState } from 'react'
import { Map, GeoJSONSource, Layer } from 'react-mapbox-ts'
import mapboxConf from '@/assets/mapbox.conf'
import { request } from 'umi'
import { LngLatLike } from 'react-mapbox-ts/node_modules/@types/mapbox-gl'
const IndexPageDemo: React.FC = () => {
  const mapRef = useRef<mapboxgl.Map>()
  const url = 'https://wanderdrone.appspot.com/'
  const [center, setCenter] = useState<LngLatLike>([0, 0])
  const [data, setData] = useState()
  useEffect(() => {
    setInterval(WsetInterval, 2000)
  }, [])
  const WsetInterval = useCallback(() => {
    request(url, { method: 'get' }).then((res) => {
      setData(res)
      setCenter(res.geometry.coordinates)
      // fly the map to the drone's current location
    })
  }, [])

  return (
    <Map
      ref={mapRef}
      accessToken={mapboxConf.accessToken}
      style={mapboxConf.style}
      center={center}
      zoom={mapboxConf.zoom}
      workercount={100}
    >
      <GeoJSONSource id="tiandi" option={{ data: data || url }}>
        <Layer
          id="tiandi"
          type="symbol"
          source="tiandi"
          layout={{
            'icon-image': 'rocket-15'
          }}
        />
      </GeoJSONSource>
    </Map>
  )
}
export default IndexPageDemo
