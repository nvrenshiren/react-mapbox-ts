import mapboxConf from '@/assets/mapbox.conf'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { CanvasSource, Layer, Map } from 'react-mapbox-ts'

class Circle {
  constructor(
    x: number,
    y: number,
    dx: number,
    dy: number,
    radius: number,
    color: string,
    ctx: CanvasRenderingContext2D
  ) {
    this.x = x
    this.y = y
    this.dx = dx
    this.dy = dy
    this.radius = radius
    this.color = color
    this.ctx = ctx
  }
  x: number = 0
  y: number = 0
  dx: number = 0
  dy: number = 0
  radius: number = 0
  color: string = ''
  ctx: CanvasRenderingContext2D
  draw() {
    this.ctx.beginPath()
    this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    this.ctx.strokeStyle = this.color
    this.ctx.stroke()
  }
  update() {
    if (this.x + this.radius > 400 || this.x - this.radius < 0) {
      this.dx = -this.dx
    }
    if (this.y + this.radius > 400 || this.y - this.radius < 0) {
      this.dy = -this.dy
    }
    this.x += this.dx
    this.y += this.dy
    this.draw()
  }
}
const Demo: React.FC = () => {
  const mapRef = useRef<mapboxgl.Map>()
  const [canvas, setCanvas] = useState<HTMLCanvasElement>()
  const canvasAnimate = useCallback(() => {
    const ctx = canvas.getContext('2d')
    const circles: Circle[] = []
    const radius = 20
    for (let i = 0; i < 5; i++) {
      let color =
        '#' + (0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6)
      let x = Math.random() * (400 - radius * 2) + radius
      let y = Math.random() * (400 - radius * 2) + radius
      let dx = (Math.random() - 0.5) * 2
      let dy = (Math.random() - 0.5) * 2
      circles.push(new Circle(x, y, dx, dy, radius, color, ctx))
    }
    function animate() {
      requestAnimationFrame(animate)
      ctx.clearRect(0, 0, 400, 400)
      for (var r = 0; r < 5; r++) {
        circles[r].update()
      }
    }
    animate()
  }, [canvas])
  useEffect(() => {
    canvas && canvasAnimate()
  }, [canvas])
  return (
    <Map
      // ref={mapRef}
      ref={(map) => {
        window.map = map
      }}
      accessToken={mapboxConf.accessToken}
      style="mapbox://styles/mapbox/light-v10"
      zoom={5}
      center={[95.899147, 18.088694]}
      workercount={16}
      minZoom={4}
    >
      <CanvasSource
        ref={(e) => {
          setCanvas(e.canvas)
        }}
        id="canvas-source"
        option={{
          coordinates: [
            [91.4461, 21.5006],
            [100.3541, 21.5006],
            [100.3541, 13.9706],
            [91.4461, 13.9706]
          ],
          animate: true
        }}
      >
        <Layer id="canvas-layer" type="raster" source="canvas-source" />
      </CanvasSource>
    </Map>
  )
}
export default Demo
