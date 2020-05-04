import mapboxConf from '@/assets/mapbox.conf'
import React, { useEffect, useRef, useState } from 'react'
import { GeoJSONSource, Layer, Map } from 'react-mapbox-ts'
const Demo: React.FC = () => {
  const mapRef = useRef<mapboxgl.Map>()
  const [style, setStyle] = useState('dark-v10')
  useEffect(() => {
    setTimeout(() => {
      setStyle('satellite-v9')
    }, 5000)
    setTimeout(() => {
      setStyle('streets-v11')
    }, 10000)
    return () => {}
  }, [])
  return (
    <Map
      // ref={mapRef}
      ref={(map) => {
        window.map = map
      }}
      accessToken={mapboxConf.accessToken}
      style={`mapbox://styles/mapbox/${style}`}
      center={[-121.415061, 40.506229]}
      zoom={mapboxConf.zoom}
      workercount={50}
    >
      <GeoJSONSource
        id="national-park"
        option={{
          data: {
            type: 'FeatureCollection',
            features: [
              {
                type: 'Feature',
                geometry: {
                  type: 'Polygon',
                  coordinates: [
                    [
                      [-121.353637, 40.584978],
                      [-121.284551, 40.584758],
                      [-121.275349, 40.541646],
                      [-121.246768, 40.541017],
                      [-121.251343, 40.423383],
                      [-121.32687, 40.423768],
                      [-121.360619, 40.43479],
                      [-121.363694, 40.409124],
                      [-121.439713, 40.409197],
                      [-121.439711, 40.423791],
                      [-121.572133, 40.423548],
                      [-121.577415, 40.550766],
                      [-121.539486, 40.558107],
                      [-121.520284, 40.572459],
                      [-121.487219, 40.550822],
                      [-121.446951, 40.56319],
                      [-121.370644, 40.563267],
                      [-121.353637, 40.584978]
                    ]
                  ]
                }
              },
              {
                type: 'Feature',
                geometry: {
                  type: 'Point',
                  coordinates: [-121.415061, 40.506229]
                }
              },
              {
                type: 'Feature',
                geometry: {
                  type: 'Point',
                  coordinates: [-121.505184, 40.488084]
                }
              },
              {
                type: 'Feature',
                geometry: {
                  type: 'Point',
                  coordinates: [-121.354465, 40.488737]
                }
              }
            ]
          }
        }}
      >
        <Layer
          id="park-boundary"
          type="fill"
          source="national-park"
          paint={{
            'fill-color': '#888888',
            'fill-opacity': 0.4
          }}
          filter={['==', '$type', 'Polygon']}
        />
        {style === 'streets-v11' ? (
          <Layer
            id="park-volcanoes"
            type="circle"
            source="national-park"
            paint={{
              'circle-radius': 6,
              'circle-color': '#B42222'
            }}
            filter={['==', '$type', 'Point']}
          />
        ) : null}
      </GeoJSONSource>
    </Map>
  )
}
export default Demo
