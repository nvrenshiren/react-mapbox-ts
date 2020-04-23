import React from 'react'

export interface MapContextAction {
  map: mapboxgl.Map | null
}

export const MapContext = React.createContext<MapContextAction>({
  map: null
})
