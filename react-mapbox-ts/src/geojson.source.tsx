import { GeoJSONSourceOptions, GeoJSONSourceRaw } from 'mapbox-gl'
import { forwardRef, useCallback, useContext, useEffect, useRef } from 'react'
import { MapContext } from '.'
import useForceUpdate from './components/forceUpdate'
import { addEvents, eventsMap, MapEventList, updateEvents } from './events'
import equal from 'fast-deep-equal'

type Props = {
  id: string
  option: Omit<GeoJSONSourceRaw, 'type'>
  children?: any
}

const GeoJSONSource = forwardRef<mapboxgl.GeoJSONSource, Props>(
  (props, ref) => {
    const isMounted = useRef<boolean>(false)
    const forceUpdate = useForceUpdate()
    const { map } = useContext(MapContext)
    const eventRef = useRef({})
    const sourceRef = useRef<mapboxgl.GeoJSONSource>()
    const prevPropsRef = useRef<Props>({ ...props })
    const currentPropsRef = useRef<Props>({ ...props })
    currentPropsRef.current = props
    const { children, id, option } = props

    const DidUpdate = useCallback(() => {
      const currentProps = currentPropsRef.current
      const prevProps = prevPropsRef.current
      const { option } = currentProps
      if (!equal(option.data, prevProps.option.data)) {
        sourceRef.current?.setData(option.data!)
      }
    }, [])
    //传参id为了是区别移除当前的还是移除之前的
    const removeSource = useCallback((id: string) => {}, [])
    const reRender = useCallback(() => {
      if (!sourceRef.current) {
        initSource()
      }
    }, [])
    const initSource = useCallback(() => {
      if (!sourceRef.current) {
        map?.addSource(id, { ...option, type: 'geojson' })
        sourceRef.current = map?.getSource(id) as mapboxgl.GeoJSONSource
      }
    }, [])
    useEffect(() => {
      if (!isMounted.current) {
        isMounted.current = true
        map?.on('styledata', reRender)
        initSource()
      } else {
        DidUpdate()
        prevPropsRef.current = { ...props }
      }
    })
    useEffect(() => {
      !!ref &&
        (typeof ref === 'function'
          ? ref(sourceRef.current!)
          : (ref.current = sourceRef.current!))
    }, [])
    useEffect(() => {
      return () => {
        const currentProps = currentPropsRef.current
        const { id } = currentProps
        removeSource(id)
      }
    }, [])
    return !!map?.getSource(id) && children
  }
)

export default GeoJSONSource
