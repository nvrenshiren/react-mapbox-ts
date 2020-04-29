import mapboxgl, { AnimationOptions, FlyToOptions } from 'mapbox-gl'
import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react'
import { MapContext } from './components/context'
import {
  MapEventList,
  addEvents,
  eventsMap,
  Listeners,
  updateEvents
} from './events'
import equal from 'fast-deep-equal'
import { diffLngLat } from './utils'
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
  children?: React.ReactNode
}
interface MapDiyConf {
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
  const eventRef = useRef<Listeners<MapEventList>>({})
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
    children,
    ...mapboxOpts
  } = props

  const DidUpdate = useCallback(() => {
    if (map) {
      const currentProps = currentPropsRef.current
      const prevProps = prevPropsRef.current
      eventRef.current = updateEvents(
        eventRef.current,
        currentProps,
        map,
        eventsMap
      )
      const didZoomUpdate =
        prevProps.zoom !== currentProps.zoom &&
        currentProps.zoom !== map.getZoom()
      const didBearingUpdate =
        prevProps.bearing !== currentProps.bearing &&
        currentProps.bearing !== map.getBearing()
      const didPitchUpdate =
        prevProps.pitch !== currentProps.pitch &&
        currentProps.pitch !== map.getPitch()
      const didCenterUpdate = diffLngLat(map.getCenter(), currentProps.center)
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
      if (prevProps.renderWorldCopies !== currentProps.renderWorldCopies) {
        map.setRenderWorldCopies(currentProps.renderWorldCopies)
      }
    }
  }, [map])
  const initMap = useCallback(() => {
    if (injectCSS) {
      require('mapbox-gl/dist/mapbox-gl.css')
    }
    mapboxgl['prewarm']()
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
    eventRef.current = addEvents(eventsMap, props, map)
    map.on('load', () => {
      setMap(map)
    })
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

  return (
    <MapContext.Provider value={{ map }}>
      <div
        className={divClass}
        style={{ ...divStyle, ...{ width: '100%', height: '100%' } }}
        ref={(e) => {
          divRef.current = e!
        }}
      >
        {!!map && children}
      </div>
    </MapContext.Provider>
  )
})

export default Map
