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
  const didCenterUpdate = useMemo(() => {
    if (!props.center || prevProps.current.center === props.center) {
      return false
    } else {
      const center = map?.getCenter() || {
        lng: 0,
        lat: 0
      }
      if (Array.isArray(props.center)) {
        return (
          (props.center && props.center[0]) !== center.lng ||
          (props.center && props.center[1]) !== center.lat
        )
      } else {
        if ('lon' in props.center) {
          return (
            props.center?.lon !== center.lng || props.center.lat !== center.lat
          )
        } else {
          return (
            props.center?.lat !== center.lng || props.center.lat !== center.lat
          )
        }
      }
    }
  }, [props.center])
  const didZoomUpdate = useMemo(
    () =>
      prevProps.current.zoom !== props.zoom && props.zoom !== map?.getZoom(),
    [props.zoom]
  )
  const didBearingUpdate = useMemo(
    () =>
      prevProps.current.bearing !== props.bearing &&
      props.bearing !== map?.getBearing(),
    [props.bearing]
  )
  const didPitchUpdate = useMemo(
    () =>
      prevProps.current.pitch !== props.pitch &&
      props.pitch !== map?.getPitch(),
    [props.pitch]
  )

  const DidUpdate = useCallback(
    (prevProps: Props) => {
      if (map) {
        eventRef.current = updateMapEvents(eventRef.current, props, map)
        if (props.maxBounds) {
          const didMaxBoundsUpdate = prevProps.maxBounds !== props.maxBounds
          if (didMaxBoundsUpdate) {
            map.setMaxBounds(props.maxBounds)
          }
        }
        if (props.fitBounds) {
          const { fitBounds } = prevProps
          const didFitBoundsUpdate =
            fitBounds !== props.fitBounds ||
            props.fitBounds.length !== (fitBounds && fitBounds.length) ||
            !!fitBounds.filter((c, i) => {
              const nc = props.fitBounds && props.fitBounds[i]
              return c[0] !== (nc && nc[0]) || c[1] !== (nc && nc[1])
            })[0]
          if (
            didFitBoundsUpdate ||
            !equal(prevProps.fitBoundsOptions, props.fitBoundsOptions)
          ) {
            map.fitBounds(props.fitBounds, props.fitBoundsOptions, {
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
          const movingMethod = props.movingMethod || 'flyTo'
          map[movingMethod]({
            ...animationOptions,
            ...flyToOptions,
            zoom: (didZoomUpdate && props.zoom) || map.getZoom(),
            center: (didCenterUpdate && props.center) || map.getCenter(),
            bearing: (didBearingUpdate && props.bearing) || map.getBearing(),
            pitch: (didPitchUpdate && props.pitch) || map.getPitch()
          })
        }
        if (!!props.style && !equal(prevProps.style, props.style)) {
          console.log(123)
          map.setStyle(props.style)
        }
      }
    },
    [props, map]
  )
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
      DidUpdate(prevProps.current)
      prevProps.current = { ...props }
    }
  })
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
