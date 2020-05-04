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
    console.log('RasterDemSource')
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
      }
    }, [])
    const reRender = useCallback(() => {
      ////针对图层操作以及源数据data是外链会导致触发styledata事件
      const layers = map
        ?.getStyle()
        .layers?.filter((item) => item.source === sourceID)
      if (!map?.getSource(sourceID) || !layers?.length) {
        rasterDemRef.current = undefined
        //先刷新删除触发children卸载
        forceUpdate()
        //重新加载源
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
        console.log('removeRasterDemSource')
      }
    }, [])
    return !!map?.getSource(sourceID) && !!children ? children : null
  }
)

export default RasterDemSource
