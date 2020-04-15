import React, { useReducer, PropsWithChildren } from 'react'
import { MapMouseEvent } from 'mapbox-gl'

export type MapAction = 'remove' | 'load'
export type MapState = mapboxgl.Map | null

export interface MapDispatchArgs {
  type: MapAction
  payload: MapState
}
export interface MapContextAction {
  state: MapState
  dispatch?: (args: MapDispatchArgs) => void
}

export const MapContext = React.createContext<MapContextAction>({
  state: null
})
function reducerCallback(state: MapState, args: MapDispatchArgs): MapState {
  switch (args.type) {
    case 'remove':
      return null
    case 'load':
      return args.payload
    default:
      return state
  }
}
const MapContextComponent: React.NamedExoticComponent<PropsWithChildren<{}>> = React.memo(
  (props) => {
    const [state, dispatch] = useReducer(reducerCallback, null)
    return (
      <MapContext.Provider value={{ state, dispatch }}>
        {props.children}
      </MapContext.Provider>
    )
  }
)
export default MapContextComponent
