import mapboxgl, { AnimationOptions, FlyToOptions } from 'mapbox-gl'
import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react'
import { MapContext } from './components/context'
import { createPortal } from 'react-dom'
import {
  MapEventList,
  addMapEvents,
  eventsMap,
  Listeners,
  updateMapEvents
} from './events'
import equal from 'fast-deep-equal'
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
  MapDiyConf &
  Partial<MapEventList>
const Map = React.forwardRef<mapboxgl.Map, Props>((props, ref) => {
  const isMounted = useRef<boolean>(false)
  const [map, setMap] = useState<mapboxgl.Map | null>(null)
  const divRef = useRef<HTMLDivElement>(document.createElement('div'))
  const eventRef = useRef<Listeners>({})
  const prevPropsRef = useRef<Props>({ ...props })
  const currentPropsRef = useRef<Props>({ ...props })
  currentPropsRef.current = props
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

  const DidUpdate = useCallback(() => {
    if (map) {
      const currentProps = currentPropsRef.current
      const prevProps = prevPropsRef.current
      eventRef.current = updateMapEvents(eventRef.current, currentProps, map)
      const center = map.getCenter() || {
        lng: 0,
        lat: 0
      }
      const didZoomUpdate =
        prevProps.zoom !== currentProps.zoom &&
        currentProps.zoom !== map.getZoom()
      const didBearingUpdate =
        prevProps.bearing !== currentProps.bearing &&
        currentProps.bearing !== map.getBearing()
      const didPitchUpdate =
        prevProps.pitch !== currentProps.pitch &&
        currentProps.pitch !== map.getPitch()
      const didCenterUpdate =
        !currentProps.center || prevProps.center === currentProps.center
          ? false
          : Array.isArray(currentProps.center)
          ? (currentProps.center && currentProps.center[0]) !== center.lng ||
            (currentProps.center && currentProps.center[1]) !== center.lat
          : 'lon' in currentProps.center
          ? currentProps.center?.lon !== center.lng ||
            currentProps.center.lat !== center.lat
          : currentProps.center?.lat !== center.lng ||
            currentProps.center.lat !== center.lat

      if (currentProps.maxBounds) {
        const didMaxBoundsUpdate =
          prevProps.maxBounds !== currentProps.maxBounds
        if (didMaxBoundsUpdate) {
          map.setMaxBounds(currentProps.maxBounds)
        }
      }
      if (currentProps.fitBounds) {
        const { fitBounds } = prevProps
        const didFitBoundsUpdate =
          fitBounds !== currentProps.fitBounds ||
          currentProps.fitBounds.length !== (fitBounds && fitBounds.length) ||
          !!fitBounds.filter((c, i) => {
            const nc = currentProps.fitBounds && currentProps.fitBounds[i]
            return c[0] !== (nc && nc[0]) || c[1] !== (nc && nc[1])
          })[0]
        if (
          didFitBoundsUpdate ||
          !equal(prevProps.fitBoundsOptions, currentProps.fitBoundsOptions)
        ) {
          map.fitBounds(currentProps.fitBounds, currentProps.fitBoundsOptions, {
            fitboundUpdate: true
          })
        }
      }
      if (
        didZoomUpdate ||
        didCenterUpdate ||
        didBearingUpdate ||
        didPitchUpdate
      ) {
        const movingMethod = currentProps.movingMethod || 'flyTo'
        map[movingMethod]({
          ...animationOptions,
          ...flyToOptions,
          zoom: (didZoomUpdate && currentProps.zoom) || map.getZoom(),
          center: (didCenterUpdate && currentProps.center) || map.getCenter(),
          bearing:
            (didBearingUpdate && currentProps.bearing) || map.getBearing(),
          pitch: (didPitchUpdate && currentProps.pitch) || map.getPitch()
        })
      }
      if (!!currentProps.style && !equal(prevProps.style, currentProps.style)) {
        map.setStyle(currentProps.style)
      }
    }
  }, [map])
  const initMap = useCallback(() => {
    if (injectCSS) {
      require('mapbox-gl/dist/mapbox-gl.css')
    }
    if (baseapiurl) {
      mapboxgl.baseApiUrl = baseapiurl
    }
    if (workercount) {
      mapboxgl.workerCount = workercount
    }
    if (maxparallelimagerequests) {
      mapboxgl.maxParallelImageRequests = maxparallelimagerequests
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
    map.on('load', () => {
      if (isMounted.current) {
        setMap(map)
      }
    })
    eventRef.current = addMapEvents(eventsMap, props, map)
  }, [])
  useEffect(() => {
    if (!isMounted.current) {
      initMap()
      isMounted.current = true
    } else {
      DidUpdate()
      prevPropsRef.current = { ...props }
    }
  })
  useEffect(() => {
    return () => {
      isMounted.current = false
      map && map.remove()
    }
  }, [])
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
