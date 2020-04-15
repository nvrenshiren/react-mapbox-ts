import React from 'react'
import MapContextComponent from './components/context'
import mapboxgl from 'mapbox-gl'

interface MapGlobalConf {
  //Gets and sets the map's default API URL for requesting tiles, styles, sprites, and glyphs
  baseapiurl?: string
  //Gets and sets the number of web workers instantiated on a page with GL JS maps. By default, it is set to half the number of CPU cores (capped at 6). Make sure to set this property before creating any map instances for it to have effect.
  workercount?: number
  //Gets and sets the maximum number of images (raster tiles, sprites, icons) to load in parallel, which affects performance in raster-heavy maps. 16 by default.
  maxparallelimagerequests?: number
}

const Map = () => {
  return React.forwardRef<mapboxgl.Map, mapboxgl.MapboxOptions & MapGlobalConf>(
    (props, ref) => {
      const { accessToken } = props
      let a = new mapboxgl.Map()

      return <MapContextComponent></MapContextComponent>
    }
  )
}
export default Map
