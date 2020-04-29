import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  useMemo,
  forwardRef,
  useContext
} from 'react'
import equal from 'fast-deep-equal'
import { MapContext } from '.'
import { AnySourceData } from 'mapbox-gl'
import { MapEventList, addEvents, eventsMap, updateEvents } from './events'
import useForceUpdate from './components/forceUpdate'

interface Props
  extends Partial<Pick<MapEventList, 'onSourceData' | 'onSourceDataLoading'>> {
  id: string
  children: any
}

const Source = forwardRef<mapboxgl.AnySourceImpl, Props & AnySourceData>(
  (props, ref) => {
    const isMounted = useRef<boolean>(false)
    const forceUpdate = useForceUpdate()
    const { map } = useContext(MapContext)
    const eventRef = useRef({})
    const prevPropsRef = useRef<Props & AnySourceData>({ ...props })
    const currentPropsRef = useRef<Props & AnySourceData>({ ...props })
    currentPropsRef.current = props
    const {
      children,
      id,
      onSourceData,
      onSourceDataLoading,
      ...options
    } = props
    const initSource = useCallback(() => {
      const currentProps = currentPropsRef.current
      const {
        children,
        id,
        onSourceData,
        onSourceDataLoading,
        ...options
      } = currentProps
      if (!map?.getSource(id)) {
        if (options) {
          map?.addSource(id, options)
        }
        map?.on('sourcedata', onData)
      }
    }, [])
    const onData = useCallback(() => {
      const currentProps = currentPropsRef.current
      const { id } = currentProps
      const source = map?.getSource(id)
      if (!source || !map?.isSourceLoaded(id)) {
        return
      }
      map.off('sourcedata', onData)
    }, [])
    const DidUpdate = useCallback(() => {
      const currentProps = currentPropsRef.current
      const prevProps = prevPropsRef.current
      const {
        children,
        id,
        onSourceData,
        onSourceDataLoading,
        ...options
      } = currentProps
      eventRef.current = updateEvents(
        eventRef.current,
        currentProps,
        map!,
        eventsMap
      )
    }, [])
    //传参id为了是区别移除当前的还是移除之前的
    const removeSource = useCallback((id: string) => {
      if (map?.getSource(id)) {
        map.removeSource(id)
      }
    }, [])
    const styleChange = useCallback(() => {
      const currentProps = currentPropsRef.current
      const { id } = currentProps
      if (!map?.getLayer(id)) {
        initSource()
        forceUpdate()
      }
    }, [])

    useEffect(() => {
      if (!isMounted.current) {
        map?.on('styledata', styleChange)
        map?.addSource(id, { ...options })
        isMounted.current = true
      } else {
        DidUpdate()
        prevPropsRef.current = { ...props }
      }
    })
    useEffect(() => {
      !!ref &&
        (typeof ref === 'function'
          ? ref(map?.getSource(id)!)
          : (ref.current = map?.getSource(id)!))
      eventRef.current = addEvents(eventsMap, props, map!)
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

export default Source
