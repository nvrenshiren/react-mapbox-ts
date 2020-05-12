import equal from 'fast-deep-equal'
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
  option: Omit<mapboxgl.RasterDemSource, 'type'>
  children?: any
}

const RasterDemSource = forwardRef<mapboxgl.RasterDemSource, Props>(
  (props, ref) => {
    const isMounted = useRef<boolean>(false)
    const forceUpdate = useForceUpdate()
    const { map } = useContext(MapContext)
    const rasterDemRef = useRef<mapboxgl.RasterDemSource>()
    const prevPropsRef = useRef<Props>({ ...props })
    const currentPropsRef = useRef<Props>({ ...props })
    currentPropsRef.current = props
    const { children, id } = props
    const sourceID = useMemo(() => id, [])
    const DidUpdate = useCallback(() => {
      const currentProps = currentPropsRef.current
      const prevProps = prevPropsRef.current
      const { option } = currentProps
      if (!equal(option, prevProps.option)) {
        removeSource()
        reRender()
      }
    }, [])
    const reRender = useCallback(() => {
      ////针对图层操作以及源数据data是外链会导致触发styledata事件
      if (!map?.getSource(sourceID)) {
        rasterDemRef.current = undefined
        forceUpdate()
        initSource()
      }
    }, [])
    const initSource = useCallback(() => {
      const currentProps = currentPropsRef.current
      if (!map?.getSource(sourceID)) {
        map?.addSource(sourceID, { ...currentProps.option, type: 'raster-dem' })
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
      rasterDemRef.current = map?.getSource(
        sourceID
      ) as mapboxgl.RasterDemSource
      if (!rasterDemRef.current || !map?.isSourceLoaded(sourceID)) {
        return
      }
      if (rasterDemRef.current && !!currentProps.option) {
      }
      //传递ref
      !!ref &&
        (typeof ref === 'function'
          ? ref(rasterDemRef.current!)
          : (ref.current = rasterDemRef.current!))
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
        prevPropsRef.current = { ...props }
      }
    })
    useEffect(() => {
      return () => {
        map?.off('style.load', reRender)
        removeSource()
      }
    }, [])
    return !!rasterDemRef.current && !!children ? children : null
  }
)

export default RasterDemSource
