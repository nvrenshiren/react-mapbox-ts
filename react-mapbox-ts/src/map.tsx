import mapboxgl, { AnimationOptions, FlyToOptions } from 'mapbox-gl'
import React, { useEffect, useRef, useState, useCallback } from 'react'
import { MapContext } from './components/context'
import { createPortal } from 'react-dom'

interface MapGlobalConf {
  baseapiurl?: string
  workercount?: number
  maxparallelimagerequests?: number
  setRTLTextPlugin?: string
}
interface MapDivConf {
  divStyle?: React.CSSProperties
  divClass?: string
  injectCSS?: boolean
  children?: JSX.Element
}
interface MapDiyConf {
  renderChildrenInPortal?: boolean
  movingMethod?: 'jumpTo' | 'easeTo' | 'flyTo'
  fitBounds?: [[number, number], [number, number]]
  animationOptions?: Partial<AnimationOptions>
  flyToOptions?: Partial<FlyToOptions>
}
type Props = Partial<Omit<mapboxgl.MapboxOptions, 'container'>> &
  MapGlobalConf &
  MapDivConf &
  MapDiyConf
const Map = React.forwardRef<mapboxgl.Map, Props>((props, ref) => {
  const isMounted = useRef<boolean>(false)

  const [map, setMap] = useState<mapboxgl.Map | null>(null)
  const divRef = useRef<HTMLDivElement>(document.createElement('div'))
  const prevProps = useRef<Props>({ ...props })
  const currentProps = useRef<Props>({ ...props })
  currentProps.current = props
  const {
    baseapiurl,
    workercount,
    maxparallelimagerequests,
    setRTLTextPlugin,
    divStyle,
    divClass,
    injectCSS = true,
    movingMethod = 'jumpTo',
    animationOptions,
    fitBounds,
    flyToOptions,
    renderChildrenInPortal,
    children,
    ...mapboxOpts
  } = props

  const DidUpdate = useCallback((prevProps: Props) => {
    if (map) {
      const center = map.getCenter()
      const zoom = map.getZoom()
      const bearing = map.getBearing()
      const pitch = map.getPitch()
    }
  }, [])
  const initMap = useCallback(() => {
    if (injectCSS) {
      require('mapbox-gl/dist/mapbox-gl.css')
    }
    if (baseapiurl) {
      ;(mapboxgl as any).baseApiUrl = baseapiurl
    }
    if (workercount) {
      ;(mapboxgl as any).workercount = workercount
    }
    if (maxparallelimagerequests) {
      ;(mapboxgl as any).maxParallelImageRequests = maxparallelimagerequests
    }
    if (setRTLTextPlugin) {
      mapboxgl.setRTLTextPlugin(
        setRTLTextPlugin,
        (error) => {
          throw error
        },
        true
      )
    }
    let map = new mapboxgl.Map({
      ...mapboxOpts,
      container: divRef.current!,
      center: !!fitBounds
        ? [
            (fitBounds[0][0] + fitBounds[1][0]) / 2,
            (fitBounds[0][1] + fitBounds[1][1]) / 2
          ]
        : mapboxOpts.center
    })
    !!ref && (typeof ref === 'function' ? ref(map) : (ref.current = map))
    setMap(map)
  }, [])
  useEffect(() => {
    if (!isMounted.current) {
      initMap()
      isMounted.current = true
    } else {
      DidUpdate(prevProps.current)
      prevProps.current = { ...props }
    }
  })
  useEffect(() => {}, [])
  const container =
    renderChildrenInPortal &&
    map &&
    typeof map.getCanvasContainer === 'function'
      ? map.getCanvasContainer()
      : undefined
  return (
    <MapContext.Provider value={{ map }}>
      <div
        className={divClass}
        style={{ ...divStyle, ...{ width: '100%', height: '100%' } }}
        ref={(e) => {
          divRef.current = e!
        }}
      >
        {!!map && (container ? createPortal(children, container) : children)}
      </div>
    </MapContext.Provider>
  )
})

export default Map
