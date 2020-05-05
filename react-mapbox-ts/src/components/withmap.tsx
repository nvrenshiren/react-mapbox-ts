import React from 'react'
import { MapContext, MapContextAction } from './context'

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
