import mapboxgl, { LngLatLike } from 'mapbox-gl'
import { forwardRef, useCallback, useContext, useEffect, useRef } from 'react'
import { MapContext } from './components/context'
import { MarkerEventList } from './events'
interface Props extends mapboxgl.MarkerOptions, Partial<MarkerEventList> {
  children?: JSX.Element
  positon: LngLatLike
}

const Marker = forwardRef<mapboxgl.Marker, Props>((props, ref) => {
  const isMounted = useRef<boolean>(false)
  const { map } = useContext(MapContext)
  const prevPropsRef = useRef<Props>({ ...props })
  const currentPropsRef = useRef<Props>({ ...props })
  const eventRef = useRef({})
  currentPropsRef.current = props
  const { children, positon, ...options } = props
  const markerRef = useRef<mapboxgl.Marker>(
    new mapboxgl.Marker(options).setLngLat(positon)
  )
  const DidUpdate = useCallback(() => {}, [])
  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true
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
  }, [])
  return null
})

export default Marker
