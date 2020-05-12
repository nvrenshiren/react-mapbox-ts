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
  hidden?: boolean
}
const Popup = forwardRef<mapboxgl.Popup, Props & mapboxgl.PopupOptions>(
  (props, ref) => {
    const isMounted = useRef<boolean>(false)
    const [show, setShow] = useState(false)
    const { map } = useContext(MapContext)
    const prevPropsRef = useRef<Props>({ ...props })
    const currentPropsRef = useRef<Props>({ ...props })
    const { children, positon, withMarker, hidden = false, ...options } = props
    currentPropsRef.current = props
    const popupRef = useRef<mapboxgl.Popup | null>(
      new mapboxgl.Popup(options).setHTML('<div class="popup-content"></div>')
    )
    const DidUpdate = useCallback(() => {
      const currentProps = currentPropsRef.current
      if (!currentProps.withMarker) {
        popupRef.current?.setLngLat(currentProps.positon!)
        if (!show) {
          setShow(true)
          if (currentProps.hidden) {
            popupRef.current?.remove()
          } else {
            popupRef.current?.addTo(map!)
          }
        }
      }
    }, [show])
    const initPopup = useCallback(() => {
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
            popupRef.current?.setLngLat(positon)
            if (!hidden) popupRef.current?.addTo(map!)
          } else {
            throw new Error('独立使用的Popup必须添加position属性')
          }
        }
      }
    }, [])
    //对于有自身状态的组件,更新操作建议只监听props来进行
    useEffect(() => {
      if (isMounted.current) {
        DidUpdate()
        prevPropsRef.current = { ...props }
      }
    }, [props])
    useEffect(() => {
      if (!isMounted.current) {
        isMounted.current = true
        initPopup()
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
    return show && !hidden && !!popupRef.current?.getElement()
      ? createPortal(
          children,
          popupRef.current.getElement().querySelector('.popup-content')!
        )
      : null
  }
)

export default Popup
