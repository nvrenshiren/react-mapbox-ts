import { GeoJSONSourceOptions, Map } from 'mapbox-gl'
import { forwardRef, useCallback, useContext, useEffect, useRef } from 'react'
import { MapContext } from '.'
import useForceUpdate from './components/forceUpdate'
import {
  addEvents,
  eventsMap,
  MapEventList,
  updateEvents,
  MapLayerEventList
} from './events'

type Props = mapboxgl.Layer & Partial<MapLayerEventList>

const Layer = forwardRef<mapboxgl.Layer, Props>((props, ref) => {
  const isMounted = useRef<boolean>(false)
  const forceUpdate = useForceUpdate()
  const { map } = useContext(MapContext)
  const eventRef = useRef({})
  const layerRef = useRef<mapboxgl.Layer>()
  const prevPropsRef = useRef<Props>({ ...props })
  const currentPropsRef = useRef<Props>({ ...props })
  currentPropsRef.current = props
  const {
    onClick,
    onContextMenu,
    onDblClick,
    onMouseDown,
    onMouseEnter,
    onMouseLeave,
    onMouseMove,
    onMouseOut,
    onMouseOver,
    onMouseUp,
    onTouchCancel,
    onTouchEnd,
    onTouchStart,
    ...options
  } = currentPropsRef.current
  const DidUpdate = useCallback(() => {
    eventRef.current = updateEvents(
      eventRef.current,
      currentPropsRef.current,
      map!,
      eventsMap
    )
  }, [])
  //传参id为了是区别移除当前的还是移除之前的
  const removeLayer = useCallback((id: string) => {}, [])
  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true
      map?.addLayer(options)
    } else {
      DidUpdate()
      prevPropsRef.current = { ...props }
    }
  })
  useEffect(() => {
    !!ref &&
      (typeof ref === 'function'
        ? ref(layerRef.current!)
        : (ref.current = layerRef.current!))
    eventRef.current = addEvents(eventsMap, props, map!)
  }, [])
  useEffect(() => {
    return () => {}
  }, [])
  return null
})

export default Layer
