import mapboxgl, { LngLatLike } from 'mapbox-gl'
import React, {
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useRef
} from 'react'
import { createPortal } from 'react-dom'
import { MapContext } from './components/context'
import {
  addEvents,
  eventsMarker,
  MarkerEventList,
  updateEvents
} from './events'
import Popup from './popup'
import { diffLngLat } from './utils'
interface Props
  extends Omit<mapboxgl.MarkerOptions, 'element'>,
    Partial<MarkerEventList> {
  positon: LngLatLike
  show?: boolean
  popup?: React.ReactNode
  popupOption?: mapboxgl.PopupOptions
  children?: React.ReactNode
}

const Marker = forwardRef<mapboxgl.Marker, Props>((props, ref) => {
  const isMounted = useRef<boolean>(false)
  const { map } = useContext(MapContext)
  const prevPropsRef = useRef<Props>({ ...props })
  const currentPropsRef = useRef<Props>({ ...props })
  currentPropsRef.current = props
  const eventRef = useRef({})
  const {
    children,
    positon,
    show = true,
    popup,
    popupOption,
    ...options
  } = props
  const markerRef = useRef<mapboxgl.Marker>(
    new mapboxgl.Marker({
      ...options,
      element: !!children ? document.createElement('div') : undefined
    }).setLngLat(positon)
  )
  const DidUpdate = useCallback(() => {
    const currentProps = currentPropsRef.current
    const prevProps = prevPropsRef.current
    eventRef.current = updateEvents(
      eventRef.current,
      currentProps,
      markerRef.current,
      eventsMarker
    )
    const didShowUpdate = currentProps.show !== prevProps.show
    if (didShowUpdate)
      markerRef.current[!!currentProps.show ? 'addTo' : 'remove'](map!)

    const didPositionUpdate = diffLngLat(
      markerRef.current.getLngLat(),
      currentProps.positon
    )
    const didOffsetUpdate =
      prevProps.offset !== currentProps.offset &&
      currentProps.offset !== markerRef.current.getOffset()
    const didDraggableUpdate =
      !!prevProps.draggable !== !!currentProps.draggable
    if (didPositionUpdate) markerRef.current.setLngLat(currentProps.positon)
    if (didOffsetUpdate && currentProps.offset)
      markerRef.current.setOffset(currentProps.offset)
    if (didDraggableUpdate)
      markerRef.current.setDraggable(!!currentProps.draggable)
  }, [])

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true
      markerRef.current[show ? 'addTo' : 'remove'](map!)
    } else {
      DidUpdate()
      prevPropsRef.current = { ...props }
    }
  })
  useEffect(() => {
    !!ref &&
      (typeof ref === 'function'
        ? ref(markerRef.current)
        : (ref.current = markerRef.current))
    eventRef.current = addEvents(eventsMarker, props, markerRef.current)
  }, [])
  useEffect(() => {
    return () => {
      isMounted.current = false
      markerRef.current.remove()
    }
  }, [])

  return (
    <>
      {children ? createPortal(children, markerRef.current.getElement()) : null}
      {!!popup && (
        <Popup {...popupOption} withMarker={markerRef.current}>
          {popup}
        </Popup>
      )}
    </>
  )
})

export default Marker
