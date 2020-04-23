import { MapContext, MapContextAction } from './context'
import React from 'react'

interface withMapProps {
  map: MapContextAction
}

export function withMap<T>(Component: React.ComponentType<T & withMapProps>) {
  return (props: T) => {
    return (
      <MapContext.Consumer>
        {(map) => <Component map={map} {...props} />}
      </MapContext.Consumer>
    )
  }
}
