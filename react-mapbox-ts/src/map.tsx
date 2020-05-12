import equal from 'fast-deep-equal'
import mapboxgl, { AnimationOptions, FlyToOptions, MapBoxPlus } from 'mapbox-gl'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { MapContext } from './components/context'
import {
  addEvents,
  eventsMap,
  Listeners,
  MapEventList,
  updateEvents
} from './events'
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
const Map = React.forwardRef<MapBoxPlus, Props>((props, ref) => {
  const isMounted = useRef<boolean>(false)
  const [map, setMap] = useState<MapBoxPlus | null>(null)
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
      const didZoomUpdate = prevProps.zoom !== currentProps.zoom
      const didBearingUpdate = prevProps.bearing !== currentProps.bearing
      const didPitchUpdate = prevProps.pitch !== currentProps.pitch
      const didCenterUpdate = !equal(prevProps.center, currentProps.center)

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

      //地图样式
      if (!!currentProps.style && !equal(prevProps.style, currentProps.style)) {
        map.setStyle(currentProps.style)
      }
      //地图副本
      if (prevProps.renderWorldCopies !== currentProps.renderWorldCopies) {
        map.setRenderWorldCopies(currentProps.renderWorldCopies)
      }
      //地图操作开关
      const interActions = [
        'scrollZoom',
        'boxZoom',
        'dragRotate',
        'dragPan',
        'keyboard',
        'doubleClickZoom',
        'touchZoomRotate'
      ]
      interActions.forEach((key) => {
        if (prevProps[key] !== currentProps[key]) {
          map[key][currentProps[key] ? 'enable' : 'disable']()
        }
      })
      const MaxMinConfs = [
        'maxBounds',
        'maxZoom',
        'minZoom',
        'minPitch',
        'maxPitch'
      ]
      MaxMinConfs.forEach((key) => {
        if (prevProps[key] !== currentProps[key]) {
          map[`set${key.charAt(0).toUpperCase() + key.slice(1)}`](
            currentProps[key]
          )
        }
      })

      //地图视角
      if (
        didZoomUpdate ||
        didCenterUpdate ||
        didBearingUpdate ||
        didPitchUpdate
      ) {
        const movingMethod = currentProps.movingMethod || 'flyTo'
        map[movingMethod]({
          ...currentProps.animationOptions,
          ...currentProps.flyToOptions,
          zoom: (didZoomUpdate && currentProps.zoom) || map.getZoom(),
          center: (didCenterUpdate && currentProps.center) || map.getCenter(),
          bearing:
            (didBearingUpdate && currentProps.bearing) || map.getBearing(),
          pitch: (didPitchUpdate && currentProps.pitch) || map.getPitch()
        })
      }
    }
  }, [map])
  const initMap = useCallback(() => {
    if (injectCSS) {
      require('mapbox-gl/dist/mapbox-gl.css')
    }
    mapboxgl.prewarm()
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
    }) as MapBoxPlus
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
    }
  })
  useEffect(() => {
    //自身的state不触发更新
    if (isMounted.current) {
      DidUpdate()
      prevPropsRef.current = { ...props }
    }
  }, [props])
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
