import { MapContext, MapContextAction } from './context'
import React from 'react'

export function withMap<T>(
  Component: React.ComponentType<T & MapContextAction>
) {
  return (props: T) => {
    return (
      <MapContext.Consumer>
        {(MapContext) => <Component map={MapContext.map} {...props} />}
      </MapContext.Consumer>
    )
  }
}
