import { MapContext, MapContextAction } from './context'
import React, { ReactElement, useContext } from 'react'

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

type Props = {
  map: any
}
const WithContent: React.FC<Props> = (props) => {
  return (
    <MapContext.Provider value={{ map: props.map }}>
      {props.children}
    </MapContext.Provider>
  )
}
export default WithContent
