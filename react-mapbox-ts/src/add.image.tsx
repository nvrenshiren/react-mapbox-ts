import equal from 'fast-deep-equal'
import {
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef
} from 'react'
import { MapContext, useForceUpdate } from '.'
import { ImageRef } from './types'

interface Props {
  name: string
  image: ImageRef
  options?: { pixelRatio?: number; sdf?: boolean }
  children?: any
}

const AddImage = forwardRef<ImageRef, Props>((props, ref) => {
  const isMounted = useRef<boolean>(false)
  const forceUpdate = useForceUpdate()
  const { map } = useContext(MapContext)
  const prevPropsRef = useRef<Props>({ ...props })
  const currentPropsRef = useRef<Props>({ ...props })
  currentPropsRef.current = props
  const imgRef = useRef<ImageRef>()
  const { children, name } = props
  const imageName = useMemo(() => name, [])
  const DidUpdate = useCallback(() => {
    const currentProps = currentPropsRef.current
    const prevProps = prevPropsRef.current
    const { image } = currentProps
    if (!equal(image, prevProps.image)) {
      map?.updateImage(imageName, image)
    }
  }, [])
  //删除整个源必须先将其归属的layer也删除掉
  const removeImage = useCallback(() => {
    if (map && map.hasImage('imageName')) {
      map.removeImage(imageName)
    }
  }, [])
  const getImage = useCallback(() => {
    const currentProps = currentPropsRef.current
    const { image, options } = currentProps
    map?.addImage(imageName, image, options)
    imgRef.current = image
    forceUpdate()
  }, [])
  useEffect(() => {
    if (!isMounted.current) {
      getImage()
      isMounted.current = true
    } else {
      DidUpdate()
      prevPropsRef.current = { ...props }
    }
  })
  useEffect(() => {
    return () => {
      removeImage()
    }
  }, [])
  return !!imgRef.current && !!children ? children : null
})
export default AddImage
