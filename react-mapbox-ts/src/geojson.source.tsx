import equal from 'fast-deep-equal'
import { GeoJSONSourceRaw } from 'mapbox-gl'
import {
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useMemo
} from 'react'
import { MapContext } from '.'
import useForceUpdate from './components/forceUpdate'

type Props = {
  //ID配置了就不要改动
  id: string
  option: Omit<GeoJSONSourceRaw, 'type'>
  children?: any
}
const GeoJSONSource = forwardRef<mapboxgl.GeoJSONSource, Props>(
  (props, ref) => {
    const isMounted = useRef<boolean>(false)
    const forceUpdate = useForceUpdate()
    const { map } = useContext(MapContext)
    const sourceRef = useRef<mapboxgl.GeoJSONSource>()
    const prevPropsRef = useRef<Props>(props)
    const currentPropsRef = useRef<Props>(props)
    currentPropsRef.current = props
    const { children, id } = props
    const sourceID = useMemo(() => id, [])

    const DidUpdate = useCallback(() => {
      const currentProps = currentPropsRef.current
      const prevProps = prevPropsRef.current
      const { option } = currentProps
      if (
        !equal(option.data, prevProps.option.data) ||
        JSON.stringify(option.data) !== JSON.stringify(prevProps.option.data)
      ) {
        sourceRef.current?.setData(option.data!)
      }
    }, [])
    const reRender = useCallback((e) => {
      if (!map?.getSource(sourceID)) {
        sourceRef.current = undefined
        forceUpdate()
        initSource()
      }
    }, [])
    const initSource = useCallback(() => {
      const currentProps = currentPropsRef.current
      if (!map?.getSource(sourceID)) {
        map?.addSource(sourceID, { ...currentProps.option, type: 'geojson' })
        map?.on('sourcedata', getSource)
      }
    }, [])
    //删除整个源必须先将其归属的layer也删除掉
    const removeSource = useCallback(() => {
      if (map?.getSource(sourceID)) {
        const { layers } = map?.getStyle()!
        layers
          ?.filter((item) => item.source === sourceID)
          .forEach(
            (item) => !!map.getLayer(item.id) && map.removeLayer(item.id)
          )
        map.removeSource(sourceID)
      }
    }, [])
    //如果是外链Source则需要判断是否下载完成
    const getSource = useCallback(() => {
      const currentProps = currentPropsRef.current
      sourceRef.current = map?.getSource(sourceID) as mapboxgl.GeoJSONSource
      if (!sourceRef.current || !map?.isSourceLoaded(sourceID)) {
        return
      }
      if (sourceRef.current && !!currentProps.option.data) {
        //其他操作
      }
      //传递ref
      !!ref &&
        (typeof ref === 'function'
          ? ref(sourceRef.current!)
          : (ref.current = sourceRef.current!))
      map?.off('sourcedata', getSource)
      forceUpdate()
    }, [])
    const willMount = useCallback(() => {
      map?.on('style.load', reRender)
    }, [])
    useEffect(() => {
      if (!isMounted.current) {
        initSource()
        willMount()
        isMounted.current = true
      } else {
        DidUpdate()
        //对props过来的data进行深拷贝
        prevPropsRef.current = {
          ...props,
          option: {
            data: props.option.data
              ? JSON.parse(JSON.stringify(props.option.data))
              : {}
          }
        }
      }
    })
    useEffect(() => {
      return () => {
        map?.off('style.load', reRender)
        removeSource()
      }
    }, [])

    return !!sourceRef.current && !!children ? children : null
  }
)

export default GeoJSONSource
