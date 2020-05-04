import equal from 'fast-deep-equal'
import { CanvasSourceRaw } from 'mapbox-gl'
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
  option: Omit<Omit<CanvasSourceRaw, 'type'>, 'canvas'>
  children?: any
  width?: number
  height?: number
}
type funcRefProps = { canvas: HTMLCanvasElement; source: mapboxgl.CanvasSource }

const CanvasSource = forwardRef<funcRefProps, Props>((props, ref) => {
  console.log('CanvasSource')
  const isMounted = useRef<boolean>(false)
  const forceUpdate = useForceUpdate()
  const { map } = useContext(MapContext)
  const sourceRef = useRef<mapboxgl.CanvasSource>()
  const canvasRef = useRef<HTMLCanvasElement>()
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
      sourceRef.current?.setCoordinates(option.coordinates)
      if (!!option.animate) {
        sourceRef.current?.play()
      } else {
        sourceRef.current?.pause()
      }
    }
  }, [])
  const reRender = useCallback(() => {
    ////针对图层操作以及源数据data是外链会导致触发styledata事件
    const layers = map
      ?.getStyle()
      .layers?.filter((item) => item.source === sourceID)
    if (!map?.getSource(sourceID) || !layers?.length) {
      sourceRef.current = undefined
      forceUpdate()
      initSource()
    }
  }, [])
  const addCanvas = useCallback(() => {
    const currentProps = currentPropsRef.current
    if (!canvasRef.current) {
      canvasRef.current = document.createElement('canvas')
      canvasRef.current.width = currentProps.width || 400
      canvasRef.current.height = currentProps.height || 400
      document.body.appendChild(canvasRef.current)
    }
  }, [])
  const removeCanvas = useCallback(() => {
    canvasRef.current && canvasRef.current.remove()
    canvasRef.current = undefined
  }, [])
  const initSource = useCallback(() => {
    const currentProps = currentPropsRef.current
    if (!map?.getSource(sourceID) && !!canvasRef.current) {
      map?.addSource(sourceID, {
        ...currentProps.option,
        type: 'canvas',
        canvas: canvasRef.current
      })
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
      sourceRef.current = undefined
    }
  }, [])
  const sendRef = useCallback(() => {
    //传递ref
    !!ref &&
      (typeof ref === 'function'
        ? ref({
            canvas: canvasRef.current!,
            source: sourceRef.current!
          })
        : (ref.current = {
            canvas: canvasRef.current!,
            source: sourceRef.current!
          }))
  }, [])
  //如果是外链Source则需要判断是否下载完成
  const getSource = useCallback(() => {
    sourceRef.current = map?.getSource(sourceID) as mapboxgl.CanvasSource
    if (!sourceRef.current || !map?.isSourceLoaded(sourceID)) {
      return
    }
    sendRef()
    map?.off('sourcedata', getSource)
    /**
     *1.初次加载如果是外链源,会触发两次styledata事件
     *2.后期修改style会触发三次styledata事件
     *3.第一次触发都拿不到getSource并且官方会清除layer层,所以当拿到了Source后需要强制刷新让子layer在add一次
     *4.初次加载源如果是本地对象的话,直接渲染且不会触发styledata事件
     */
    forceUpdate()
    /**
     *
     */
  }, [])
  const willMount = useCallback(() => {
    map?.on('styledata', reRender)
  }, [])
  useEffect(() => {
    if (!isMounted.current) {
      addCanvas()
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
      removeCanvas()
      console.log('removeCanvasSource')
    }
  }, [])

  return !!map?.getSource(sourceID) && !!children ? children : null
})

export default CanvasSource
