import React from 'react'
import { MapBoxPlus } from 'mapbox-gl'

export interface MapContextAction {
  map: MapBoxPlus | null
}

export const MapContext = React.createContext<MapContextAction>({
  map: null
})
