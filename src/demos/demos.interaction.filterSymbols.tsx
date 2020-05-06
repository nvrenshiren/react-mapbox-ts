import React, { useRef, useState, useCallback } from 'react'
import { Map, GeoJSONSource, Layer } from 'react-mapbox-ts'
import mapboxConf from '@/assets/mapbox.conf'
import { Input } from 'antd'
export default () => {
  const mapRef = useRef()
  const [key, setKey] = useState('')
  const onChange = useCallback((e) => {
    setKey(e.target.value)
  }, [])
  const places = {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        properties: {
          icon: 'theatre'
        },
        geometry: {
          type: 'Point',
          coordinates: [-77.038659, 38.931567]
        }
      },
      {
        type: 'Feature',
        properties: {
          icon: 'theatre'
        },
        geometry: {
          type: 'Point',
          coordinates: [-77.003168, 38.894651]
        }
      },
      {
        type: 'Feature',
        properties: {
          icon: 'bar'
        },
        geometry: {
          type: 'Point',
          coordinates: [-77.090372, 38.881189]
        }
      },
      {
        type: 'Feature',
        properties: {
          icon: 'bicycle'
        },
        geometry: {
          type: 'Point',
          coordinates: [-77.052477, 38.943951]
        }
      },
      {
        type: 'Feature',
        properties: {
          icon: 'music'
        },
        geometry: {
          type: 'Point',
          coordinates: [-77.031706, 38.914581]
        }
      },
      {
        type: 'Feature',
        properties: {
          icon: 'music'
        },
        geometry: {
          type: 'Point',
          coordinates: [-77.020945, 38.878241]
        }
      },
      {
        type: 'Feature',
        properties: {
          icon: 'music'
        },
        geometry: {
          type: 'Point',
          coordinates: [-77.007481, 38.876516]
        }
      }
    ]
  }
  return (
    <div className="full">
      <Map
        // ref={mapRef}
        ref={(map) => {
          window.map = map
        }}
        accessToken={mapboxConf.accessToken}
        style="mapbox://styles/mapbox/dark-v10"
        center={[-77.04, 38.907]}
        zoom={11}
      >
        <GeoJSONSource
          id="places"
          option={{
            data: places as any
          }}
        >
          {places.features.map((item) => {
            const iconName = item.properties.icon
            return (
              <Layer
                id={`poi-${iconName}`}
                type="symbol"
                source="places"
                layout={{
                  'icon-image': `${iconName}-15`,
                  'icon-size': 2,
                  'icon-allow-overlap': true,
                  'text-field': iconName,
                  'text-font': ['Open Sans Bold', 'Arial Unicode MS Bold'],
                  'text-size': 11,
                  'text-transform': 'uppercase',
                  'text-letter-spacing': 0.05,
                  'text-offset': [0, 1.5],
                  visibility:
                    iconName.indexOf(key.toLocaleLowerCase()) > -1
                      ? 'visible'
                      : 'none'
                }}
                paint={{
                  'text-color': '#202',
                  'text-halo-color': '#fff',
                  'text-halo-width': 2
                }}
                filter={['==', 'icon', iconName]}
              />
            )
          })}
        </GeoJSONSource>
      </Map>
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: 8,
          transform: 'translate(-50%,0)'
        }}
      >
        <Input
          size="large"
          placeholder="输入你需要过滤的标识名称"
          onChange={onChange}
          style={{ width: 300 }}
        />
      </div>
    </div>
  )
}
