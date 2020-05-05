import equal from 'fast-deep-equal'
import React, {
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef
} from 'react'
import { MapContext, useForceUpdate } from '.'
import { ImageRef } from './types'
import AddImage from './add.image'

interface Props {
  name: string
  url: string
  options?: { pixelRatio?: number; sdf?: boolean }
  children?: any
}

const LoadImage = forwardRef<ImageRef, Props>((props, ref) => {
  const isMounted = useRef<boolean>(false)
  const forceUpdate = useForceUpdate()
  const { map } = useContext(MapContext)
  const prevPropsRef = useRef<Props>({ ...props })
  const currentPropsRef = useRef<Props>({ ...props })
  currentPropsRef.current = props
  const imgRef = useRef<ImageRef>()
  const { name, options, children } = props
  const imageName = useMemo(() => name, [])
  const DidUpdate = useCallback(() => {
    const currentProps = currentPropsRef.current
    const prevProps = prevPropsRef.current
    const { url } = currentProps
    if (!equal(url, prevProps.url)) {
      getImage()
    }
  }, [])
  //删除整个源必须先将其归属的layer也删除掉
  const removeImage = useCallback(() => {
    if (map && map.hasImage(imageName)) {
      map.removeImage(imageName)
    }
  }, [])
  const getImage = useCallback(() => {
    const currentProps = currentPropsRef.current
    const { url } = currentProps
    map?.loadImage(url, (error: Error, image: ImageRef) => {
      if (error) {
        throw error
      } else {
        imgRef.current = image
        forceUpdate()
      }
    })
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
  return !!imgRef.current ? (
    <AddImage
      name={imageName}
      ref={ref}
      image={imgRef.current}
      options={options}
    >
      {children}
    </AddImage>
  ) : null
})
export default LoadImage
