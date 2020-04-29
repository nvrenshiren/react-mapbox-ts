import mapboxgl, { LngLatLike } from 'mapbox-gl'
import React, {
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState
} from 'react'
import { createPortal } from 'react-dom'
import { MapContext } from './components/context'

interface Props {
  positon?: LngLatLike
  children: React.ReactNode
  withMarker?: mapboxgl.Marker
}
const Popup = forwardRef<mapboxgl.Popup & mapboxgl.PopupOptions, Props>(
  (props, ref) => {
    const isMounted = useRef<boolean>(false)
    const [show, setShow] = useState(false)
    const { map } = useContext(MapContext)
    const prevPropsRef = useRef<Props>({ ...props })
    const currentPropsRef = useRef<Props>({ ...props })
    const { children, positon, withMarker, ...options } = props
    currentPropsRef.current = props
    const popupRef = useRef<mapboxgl.Popup | null>(
      new mapboxgl.Popup(options).setHTML('<div class="popup-content"></div>')
    )
    const DidUpdate = useCallback(() => {}, [])
    useEffect(() => {
      if (!isMounted.current) {
        isMounted.current = true
        if (popupRef.current) {
          popupRef.current
            .on('open', () => {
              setShow(true)
            })
            .on('close', () => {
              setShow(false)
            })
          if (!!withMarker) {
            withMarker.setPopup(popupRef.current)
          } else {
            if (!!positon) {
              popupRef.current?.setLngLat(positon).addTo(map!)
            } else {
              throw new Error('独立使用的Popup必须添加position属性')
            }
          }
        }
      } else {
        DidUpdate()
        prevPropsRef.current = { ...props }
      }
    })
    useEffect(() => {
      !!ref &&
        (typeof ref === 'function'
          ? ref(popupRef.current)
          : (ref.current = popupRef.current))
    }, [])
    useEffect(() => {
      return () => {
        isMounted.current = false
        popupRef.current && popupRef.current.off('open').off('close').remove()
      }
    }, [])
    return show && popupRef.current
      ? createPortal(
          children,
          popupRef.current.getElement().querySelector('.popup-content')!
        )
      : null
  }
)

export default Popup
