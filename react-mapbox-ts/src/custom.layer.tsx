import {
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef
} from 'react'
import { CustomLayerData, MapContext } from '.'
import { addEvents, eventsMap, MapLayerEventList, updateEvents } from './events'

type zIndex = {
  before?: string
}
interface Props extends Partial<MapLayerEventList>, zIndex {
  data: CustomLayerData
}

const CustomLayer = forwardRef<mapboxgl.Layer, Props>((props, ref) => {
  const isMounted = useRef<boolean>(false)
  const { map } = useContext(MapContext)
  const eventRef = useRef({})
  const layerRef = useRef<mapboxgl.Layer>()
  const prevPropsRef = useRef<Props>({ ...props })
  const currentPropsRef = useRef<Props>({ ...props })
  const layerID = useMemo(() => props.data.id, [])
  currentPropsRef.current = props
  const DidUpdate = useCallback(() => {
    const currentProps = currentPropsRef.current
    const prevProps = prevPropsRef.current
    eventRef.current = updateEvents(
      eventRef.current,
      currentProps,
      map!,
      eventsMap,
      layerID
    )
    if (!!currentProps.before && currentProps.before !== prevProps.before) {
      map?.moveLayer(layerID, currentProps.before)
    }
  }, [])
  //为了配合某些情况下只删除某一个layer节点而不是删除父级源source
  const removeLayer = useCallback(() => {
    !!map?.getLayer(layerID) && map?.removeLayer(layerID)
  }, [])
  const initLayer = useCallback(() => {
    if (!map?.getLayer(layerID)) {
      const currentProps = currentPropsRef.current
      const { before, data } = currentProps
      map?.addLayer(data, before || undefined)
      sendRef()
    }
  }, [])
  const reRender = useCallback(() => {
    if (!map?.getLayer(layerID)) {
      initLayer()
    }
  }, [])
  const willMount = useCallback(() => {
    map?.on('style.load', reRender)
  }, [])
  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true
      initLayer()
      willMount()
    } else {
      DidUpdate()
      prevPropsRef.current = { ...props }
    }
  })
  const sendRef = useCallback(() => {
    layerRef.current = map?.getLayer(layerID)
    !!ref &&
      (typeof ref === 'function'
        ? ref(layerRef.current!)
        : (ref.current = layerRef.current!))
  }, [])
  useEffect(() => {
    eventRef.current = addEvents(eventsMap, props, map!, layerID)
  }, [])
  useEffect(() => {
    return () => {
      map?.off('style.load', reRender)
      removeLayer()
    }
  }, [])
  return null
})

export default CustomLayer
