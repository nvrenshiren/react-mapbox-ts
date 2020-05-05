import mapboxConf from '@/assets/mapbox.conf'
import React, { useEffect, useRef, useState } from 'react'
import { GeoJSONSource, Layer, Map } from 'react-mapbox-ts'

const Demo: React.FC = () => {
  const mapRef = useRef<mapboxgl.Map>()
  const [data, setData] = useState<any>()
  const allAata = useRef<any[]>()
  const aniRef = useRef<NodeJS.Timeout>()

  useEffect(() => {
    if (!data) return
    const sendData = { ...data }
    aniRef.current = setTimeout(() => {
      if (!!allAata.current[0]) {
        sendData.features[0].geometry.coordinates.push(allAata.current[0])
        setData(sendData)
        mapRef.current.panTo(allAata.current[0])
        allAata.current.shift()
      } else {
        clearInterval(aniRef.current)
      }
    }, 10)
  }, [data])

  useEffect(() => {
    fetch('https://docs.mapbox.com/mapbox-gl-js/assets/hike.geojson')
      .then((res) => res.json())
      .then((data) => {
        allAata.current = data.features[0].geometry.coordinates
        data.features[0].geometry.coordinates = [allAata.current[0]]
        setData(data)
        mapRef.current
          .jumpTo({ center: allAata.current[0], zoom: 14 })
          .setPitch(30)
      })
    return () => {
      clearInterval(aniRef.current)
    }
  }, [])
  return (
    <Map
      // ref={mapRef}
      ref={(map) => {
        mapRef.current = map
        window.map = map
      }}
      accessToken={mapboxConf.accessToken}
      style="mapbox://styles/mapbox/satellite-v9"
      zoom={0}
      center={[-122.514426, 37.562984]}
      workercount={16}
    >
      {!!data && (
        <GeoJSONSource
          id="trace"
          option={{
            data: data
          }}
        >
          <Layer
            id="trace"
            type="line"
            source="trace"
            paint={{
              'line-color': 'yellow',
              'line-opacity': 0.75,
              'line-width': 5
            }}
          />
        </GeoJSONSource>
      )}
    </Map>
  )
}
export default Demo
