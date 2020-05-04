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
  option: Omit<mapboxgl.RasterSource, 'type'>
  children?: any
}

const RasterSource = forwardRef<mapboxgl.RasterSource, Props>((props, ref) => {
  console.log('RasterSource')
  const isMounted = useRef<boolean>(false)
  const forceUpdate = useForceUpdate()
  const { map } = useContext(MapContext)
  const rasterRef = useRef<mapboxgl.RasterSource>()
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
    }
  }, [])
  const reRender = useCallback(() => {
    ////针对图层操作以及源数据data是外链会导致触发styledata事件
    const layers = map
      ?.getStyle()
      .layers?.filter((item) => item.source === sourceID)
    if (!map?.getSource(sourceID) || !layers?.length) {
      rasterRef.current = undefined
      //先刷新删除触发children卸载
      forceUpdate()
      //重新加载源
      initSource()
    }
  }, [])
  const initSource = useCallback(() => {
    const currentProps = currentPropsRef.current
    if (!map?.getSource(sourceID)) {
      map?.addSource(sourceID, { ...currentProps.option, type: 'raster' })
      map?.on('sourcedata', getSource)
    }
  }, [])
  //删除整个源必须先将其归属的layer也删除掉
  const removeSource = useCallback(() => {
    if (map?.getSource(sourceID)) {
      const { layers } = map?.getStyle()!
      layers
        ?.filter((item) => item.source === sourceID)
        .forEach((item) => !!map.getLayer(item.id) && map.removeLayer(item.id))
      map.removeSource(sourceID)
    }
  }, [])
  //如果是外链Source则需要判断是否下载完成
  const getSource = useCallback(() => {
    const currentProps = currentPropsRef.current
    rasterRef.current = map?.getSource(sourceID) as mapboxgl.RasterSource
    if (!rasterRef.current || !map?.isSourceLoaded(sourceID)) {
      return
    }
    if (rasterRef.current && !!currentProps.option) {
    }
    //传递ref
    !!ref &&
      (typeof ref === 'function'
        ? ref(rasterRef.current!)
        : (ref.current = rasterRef.current!))
    map?.off('sourcedata', getSource)
    /**
     *1.初次加载如果是外链源,会触发两次styledata事件
     *2.后期修改style会触发三次styledata事件
     *3.第一次触发都拿不到getSource并且官方会清除layer层,所以当拿到了Source后需要强制刷新让子layer在add一次
     *4.初次加载源如果是本地对象的话,直接渲染且不会触发styledata事件
     */
    forceUpdate()
    /**
     *强制刷新触发children加载
     */
  }, [])
  const willMount = useCallback(() => {
    map?.on('styledata', reRender)
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
      map?.off('styledata', reRender)
      removeSource()
      console.log('RasterSource')
    }
  }, [])
  return !!map?.getSource(sourceID) && !!children ? children : null
})

export default RasterSource
