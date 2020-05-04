import React, { useRef, useEffect, useMemo } from 'react'
import { Map, AddImage, GeoJSONSource, Layer } from 'react-mapbox-ts'
import mapboxConf from '@/assets/mapbox.conf'
const Demo: React.FC = () => {
  const mapRef = useRef<mapboxgl.Map>()
  const width = 64
  const imgData = useMemo(() => {
    const bytesPerPixel = 4
    const data = new Uint8Array(width * width * bytesPerPixel)
    for (var x = 0; x < width; x++) {
      for (var y = 0; y < width; y++) {
        var offset = (y * width + x) * bytesPerPixel
        data[offset + 0] = (y / width) * 255 // red
        data[offset + 1] = (x / width) * 255 // green
        data[offset + 2] = 128 // blue
        data[offset + 3] = 255 // alpha
      }
    }
    return data
  }, [])

  return (
    <Map
      // ref={mapRef}
      ref={(map) => {
        window.map = map
      }}
      accessToken={mapboxConf.accessToken}
      style={mapboxConf.style}
    >
      <AddImage
        name="gradient"
        image={{
          width,
          height: width,
          data: imgData
        }}
      >
        <GeoJSONSource
          id="point"
          option={{
            data: {
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
            }
          }}
        >
          <Layer
            id="points"
            type="symbol"
            source="point"
            layout={{
              'icon-image': 'gradient'
            }}
          />
        </GeoJSONSource>
      </AddImage>
    </Map>
  )
}
export default Demo
