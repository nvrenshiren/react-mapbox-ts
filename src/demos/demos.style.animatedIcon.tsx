import React, { useRef, useEffect, useMemo, useState } from 'react'
import { Map, AddImage, GeoJSONSource, Layer } from 'react-mapbox-ts'
import mapboxConf from '@/assets/mapbox.conf'

class imageData {
  size: number = 0
  width: number
  height: number
  data: Uint8ClampedArray | Uint8Array
  context: CanvasRenderingContext2D
  map: mapboxgl.MapBoxPlus
  constructor(size: number) {
    this.size = this.width = this.height = size
    this.data = new Uint8Array(size * size * 4)
  }
  onAdd(map: mapboxgl.MapBoxPlus) {
    const canvas = document.createElement('canvas')
    canvas.width = this.size
    canvas.height = this.size
    this.context = canvas.getContext('2d')
    this.map = map
  }
  render() {
    var duration = 1000
    var t = (performance.now() % duration) / duration
    var radius = (this.size / 2) * 0.3
    var outerRadius = (this.size / 2) * 0.7 * t + radius
    var context = this.context
    context.clearRect(0, 0, this.width, this.height)
    context.beginPath()
    context.arc(this.width / 2, this.height / 2, outerRadius, 0, Math.PI * 2)
    context.fillStyle = 'rgba(255, 200, 200,' + (1 - t) + ')'
    context.fill()
    context.beginPath()
    context.arc(this.width / 2, this.height / 2, radius, 0, Math.PI * 2)
    context.fillStyle = 'rgba(255, 100, 100, 1)'
    context.strokeStyle = 'white'
    context.lineWidth = 2 + 4 * (1 - t)
    context.fill()
    context.stroke()
    this.data = context.getImageData(0, 0, this.width, this.height).data
    if (!!this.map) {
      this.map.triggerRepaint()
    }
    return true
  }
}

const Demo: React.FC = () => {
  const mapRef = useRef<mapboxgl.MapBoxPlus>()
  const imgClass = useMemo(() => new imageData(200), [])
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
        name="pulsing-dot"
        image={imgClass}
        options={{
          pixelRatio: 2
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
              'icon-image': 'pulsing-dot'
            }}
          />
        </GeoJSONSource>
      </AddImage>
    </Map>
  )
}
export default Demo
