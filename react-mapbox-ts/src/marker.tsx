import mapboxgl, { LngLatLike, Popup } from 'mapbox-gl'
import React, {
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  useMemo
} from 'react'
import { createPortal } from 'react-dom'
import { MapContext } from './components/context'
import {
  addEvents,
  eventsMarker,
  MarkerEventList,
  updateEvents
} from './events'
import { diffLngLat } from './utils'
interface Props
  extends Omit<mapboxgl.MarkerOptions, 'element'>,
    Partial<MarkerEventList> {
  positon: LngLatLike
  popup?: React.ReactNode
  popupOption?: mapboxgl.PopupOptions
  children?: React.ReactNode
}

const Marker = forwardRef<mapboxgl.Marker, Props>((props, ref) => {
  const isMounted = useRef<boolean>(false)
  const { map } = useContext(MapContext)
  const [show, setShow] = useState(false)
  const prevPropsRef = useRef<Props>({ ...props })
  const currentPropsRef = useRef<Props>({ ...props })
  currentPropsRef.current = props
  const eventRef = useRef({})
  const { children, positon, popup, popupOption, ...options } = props
  const markerRef = useRef<mapboxgl.Marker>(
    new mapboxgl.Marker({
      ...options,
      element: !!props.children ? document.createElement('div') : undefined
    }).setLngLat(positon)
  )
  const popupRef = useRef<mapboxgl.Popup | null>(
    !!props.popup
      ? new mapboxgl.Popup(popupOption)
          .setHTML('<div class="popup-content"></div>')
          .addTo(map!)
      : null
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
      if (props.popup && popupRef.current) {
        markerRef.current.setPopup(popupRef.current)
        popupRef.current
          .on('open', () => {
            setShow(true)
          })
          .on('close', () => {
            setShow(false)
          })
      }
      markerRef.current.addTo(map!)
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
      popupRef.current && popupRef.current.off('open').off('close').remove()
    }
  }, [])

  const popupEle = useMemo(() => {
    if (!!props.popup && popupRef.current && show) {
      return createPortal(
        props.popup,
        popupRef.current.getElement().querySelector('.popup-content')!
      )
    }
    return null
  }, [show])
  return (
    <>
      {props.children
        ? createPortal(props.children, markerRef.current.getElement())
        : null}
      {popupEle}
    </>
  )
})

export default Marker
