import equal from 'fast-deep-equal'
import {
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef
} from 'react'
import { MapContext } from '.'
import {
  addEvents,
  eventsLayer,
  MapLayerEventList,
  updateEvents
} from './events'
import { getDiffData } from './utils'

type zIndex = {
  before?: string
  sourceLayer?: string
}
type Props = mapboxgl.Layer & Partial<MapLayerEventList> & zIndex
const Layer = forwardRef<mapboxgl.Layer, Props>((props, ref) => {
  const isMounted = useRef<boolean>(false)
  const { map } = useContext(MapContext)
  const eventRef = useRef({})
  const layerRef = useRef<mapboxgl.Layer>()
  const prevPropsRef = useRef<Props>({ ...props })
  const currentPropsRef = useRef<Props>({ ...props })
  const layerID = useMemo(() => props.id, [])
  currentPropsRef.current = props
  const DidUpdate = useCallback(() => {
    const currentProps = currentPropsRef.current
    const prevProps = prevPropsRef.current
    eventRef.current = updateEvents(
      eventRef.current,
      currentProps,
      map!,
      eventsLayer,
      layerID
    )

    //setLayoutProperty
    const currentLayou = currentProps.layout || {}
    const prevLayou = prevProps.layout || {}
    if (!equal(currentLayou, prevLayou)) {
      const diffLayout = getDiffData(prevLayou, currentLayou)
      Object.keys(diffLayout).forEach((key) => {
        map?.setLayoutProperty(layerID, key, diffLayout[key])
      })
    }
    //setPaintProperty
    const currentPaint = currentProps.paint || {}
    const prevPaint = prevProps.paint || {}
    if (!equal(currentPaint, prevPaint)) {
      const diffPaint = getDiffData(prevPaint, currentPaint)
      Object.keys(diffPaint).forEach((key) => {
        map?.setPaintProperty(layerID, key, diffPaint[key])
      })
    }
    //setFilter
    const currentFilter = currentProps.filter || []
    const prevFilter = prevProps.filter || []
    if (!equal(currentFilter.toString(), prevFilter.toString())) {
      map?.setFilter(layerID, currentFilter)
    }

    //setLayerZoomRange
    const mapMaxZoom = map?.getMaxZoom()!
    const mapMinZoom = map?.getMinZoom()!
    const currentZoom = [
      currentProps.minzoom || mapMinZoom,
      currentProps.maxzoom || mapMaxZoom
    ]
    const prevZoom = [
      prevProps.minzoom || mapMinZoom,
      prevProps.maxzoom || mapMaxZoom
    ]
    if (!equal(currentZoom.toString(), prevZoom.toString())) {
      map?.setLayerZoomRange(layerID, currentZoom[0], currentZoom[1])
    }
    if (!!currentProps.before && currentProps.before !== prevProps.before) {
      map?.moveLayer(layerID, currentProps.before)
    }
  }, [])

  //为了配合某些情况下只删除某一个layer节点而不是删除父级源source
  const removeLayer = useCallback(() => {
    !!map?.getLayer(layerID) && map?.removeLayer(layerID)
  }, [])
  const initLayer = useCallback(() => {
    const currentProps = currentPropsRef.current
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
      sourceLayer,
      before,
      id,
      ...options
    } = currentProps
    const layOption = {
      ...options,
      id,
      ...(sourceLayer ? { 'source-layer': sourceLayer } : null)
    }
    if (!!before) {
      if (!!map?.getLayer(before)) {
        map?.addLayer(layOption, before)
      } else {
        setTimeout(initLayer, 100)
      }
    } else {
      map?.addLayer(layOption)
    }
  }, [])
  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true
      initLayer()
    } else {
      DidUpdate()
      prevPropsRef.current = { ...props }
    }
  })
  useEffect(() => {
    layerRef.current = map?.getLayer(layerID)
    !!ref &&
      (typeof ref === 'function'
        ? ref(layerRef.current!)
        : (ref.current = layerRef.current!))
    eventRef.current = addEvents(eventsLayer, props, map!, layerID)
  }, [])
  useEffect(() => {
    return () => {
      removeLayer()
    }
  }, [])
  return null
})

export default Layer
