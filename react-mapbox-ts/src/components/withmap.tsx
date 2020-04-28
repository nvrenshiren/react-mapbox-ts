import { MapContext, MapContextAction } from './context'
import React from 'react'

export function withMap<T>(
  Component: React.ComponentType<T & MapContextAction>
) {
  return (props: T) => {
    return (
      <MapContext.Consumer>
        {(MapState) => <Component map={MapState.map} {...props} />}
      </MapContext.Consumer>
    )
  }
}
