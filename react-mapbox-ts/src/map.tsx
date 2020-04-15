import React from 'react'
import MapContextComponent from './components/context'
import mapboxgl from 'mapbox-gl'

interface MapGlobalConf {
  baseapiurl?: string

  workercount?: number

  maxparallelimagerequests?: number
}

const Map = () => {
  return React.forwardRef<mapboxgl.Map, mapboxgl.MapboxOptions & MapGlobalConf>(
    (props, ref) => {
      return (
        <MapContextComponent>
          <div></div>
        </MapContextComponent>
      )
    }
  )
}
export default Map
