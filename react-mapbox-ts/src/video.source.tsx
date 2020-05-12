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
import { VideoSourcePlus } from './types'

type Props = {
  //ID配置了就不要改动
  id: string
  option: Omit<mapboxgl.VideoSourceRaw, 'type'>
  children?: any
}

const VideoSource = forwardRef<VideoSourcePlus, Props>((props, ref) => {
  const isMounted = useRef<boolean>(false)
  const forceUpdate = useForceUpdate()
  const { map } = useContext(MapContext)
  const videoRef = useRef<mapboxgl.VideoSource>()
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
      videoRef.current?.setCoordinates(option.coordinates!)
    }
  }, [])
  const reRender = useCallback(() => {
    ////针对图层操作以及源数据data是外链会导致触发styledata事件
    if (!map?.getSource(sourceID)) {
      videoRef.current = undefined
      forceUpdate()
      initSource()
    }
  }, [])
  const initSource = useCallback(() => {
    const currentProps = currentPropsRef.current
    if (!map?.getSource(sourceID)) {
      map?.addSource(sourceID, { ...currentProps.option, type: 'video' })
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
    videoRef.current = map?.getSource(sourceID) as mapboxgl.VideoSource
    if (!videoRef.current || !map?.isSourceLoaded(sourceID)) {
      return
    }
    if (videoRef.current && !!currentProps.option) {
    }
    //传递ref
    !!ref &&
      (typeof ref === 'function'
        ? ref(videoRef.current!)
        : (ref.current = videoRef.current!))
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
  return !!videoRef.current && !!children ? children : null
})

export default VideoSource
