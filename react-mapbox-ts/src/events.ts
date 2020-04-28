import {
  MapboxEvent,
  MapContextEvent,
  MapDataEvent,
  MapSourceDataEvent,
  MapStyleDataEvent,
  MapBoxZoomEvent,
  MapTouchEvent,
  MapMouseEvent,
  MapWheelEvent,
  MapLayerMouseEvent,
  MapLayerTouchEvent,
  MapEventType,
  MapLayerEventType
} from 'mapbox-gl'

export type EventAll = MapEventType & MapLayerEventType
export type EventListAll = MapEventList & MapLayerEventList & MarkerEventList
export type EventMapping<U = {}, C = {}> = Partial<{ [T in keyof U]: keyof C }>
export type EventCallBack<T = {}> = (eventData?: T) => void
export type Listeners<U> = {
  [T in keyof U]?: (evt: EventCallBack) => void
}
export type MapEventList = {
  onError: EventCallBack<ErrorEvent>
  onLoad: EventCallBack<MapboxEvent>
  onRemove: EventCallBack<MapboxEvent>
  onRender: EventCallBack<MapboxEvent>
  onResize: EventCallBack<MapboxEvent>
  onWebGlContextLost: EventCallBack<MapContextEvent>
  onWebGlContextRestored: EventCallBack<MapContextEvent>
  onDataLoading: EventCallBack<MapDataEvent>
  onData: EventCallBack<MapDataEvent>
  onTileDataLoading: EventCallBack<MapDataEvent>
  onSourceDataLoading: EventCallBack<MapSourceDataEvent>
  onStyleDataLoading: EventCallBack<MapStyleDataEvent>
  onSourceData: EventCallBack<MapSourceDataEvent>
  onStyleData: EventCallBack<MapStyleDataEvent>
  onBoxZoomCancel: EventCallBack<MapBoxZoomEvent>
  onBoxZoomStart: EventCallBack<MapBoxZoomEvent>
  onBoxZoomEnd: EventCallBack<MapBoxZoomEvent>
  onTouchCancel: EventCallBack<MapTouchEvent>
  onTouchMove: EventCallBack<MapTouchEvent>
  onTouchEnd: EventCallBack<MapTouchEvent>
  onTouchStart: EventCallBack<MapTouchEvent>
  onClick: EventCallBack<MapMouseEvent>
  onContextMenu: EventCallBack<MapMouseEvent>
  onDblClick: EventCallBack<MapMouseEvent>
  onMouseMove: EventCallBack<MapMouseEvent>
  onMouseUp: EventCallBack<MapMouseEvent>
  onMouseDown: EventCallBack<MapMouseEvent>
  onMouseOut: EventCallBack<MapMouseEvent>
  onMouseOver: EventCallBack<MapMouseEvent>
  onMoveStart: EventCallBack<
    MapboxEvent<MouseEvent | TouchEvent | WheelEvent | undefined>
  >
  onMove: EventCallBack<
    MapboxEvent<MouseEvent | TouchEvent | WheelEvent | undefined>
  >
  onMoveEnd: EventCallBack<
    MapboxEvent<MouseEvent | TouchEvent | WheelEvent | undefined>
  >
  onZoomStart: EventCallBack<
    MapboxEvent<MouseEvent | TouchEvent | WheelEvent | undefined>
  >
  onZoom: EventCallBack<
    MapboxEvent<MouseEvent | TouchEvent | WheelEvent | undefined>
  >
  onZoomEnd: EventCallBack<
    MapboxEvent<MouseEvent | TouchEvent | WheelEvent | undefined>
  >
  onRotateStart: EventCallBack<MapboxEvent<MouseEvent | TouchEvent | undefined>>
  onRotate: EventCallBack<MapboxEvent<MouseEvent | TouchEvent | undefined>>
  onRotateEnd: EventCallBack<MapboxEvent<MouseEvent | TouchEvent | undefined>>
  onDragStart: EventCallBack<MapboxEvent<MouseEvent | TouchEvent | undefined>>
  onDrag: EventCallBack<MapboxEvent<MouseEvent | TouchEvent | undefined>>
  onDragEnd: EventCallBack<MapboxEvent<MouseEvent | TouchEvent | undefined>>
  onPitchStart: EventCallBack<MapboxEvent<MouseEvent | TouchEvent | undefined>>
  onPitch: EventCallBack<MapboxEvent<MouseEvent | TouchEvent | undefined>>
  onPitchEnd: EventCallBack<MapboxEvent<MouseEvent | TouchEvent | undefined>>
  onWheel: EventCallBack<MapWheelEvent>
}

export type MapLayerEventList = {
  onClick: EventCallBack<MapLayerMouseEvent>
  onDblClick: EventCallBack<MapLayerMouseEvent>
  onMouseDown: EventCallBack<MapLayerMouseEvent>
  onMouseUp: EventCallBack<MapLayerMouseEvent>
  onMouseMove: EventCallBack<MapLayerMouseEvent>
  onMouseEnter: EventCallBack<MapLayerMouseEvent>
  onMouseLeave: EventCallBack<MapLayerMouseEvent>
  onMouseOver: EventCallBack<MapLayerMouseEvent>
  onMouseOut: EventCallBack<MapLayerMouseEvent>
  onContextMenu: EventCallBack<MapLayerMouseEvent>
  onTouchStart: EventCallBack<MapLayerTouchEvent>
  onTouchEnd: EventCallBack<MapLayerTouchEvent>
  onTouchCancel: EventCallBack<MapLayerTouchEvent>
}

type MarkerEvent = {
  type: 'drag' | 'dragend' | 'dragstart'
  target: mapboxgl.Marker
}

export type MarkerEventList = {
  onDragStart: EventCallBack<MarkerEvent>
  onDrag: EventCallBack<MarkerEvent>
  onDragEnd: EventCallBack<MarkerEvent>
}

export const eventsMap: EventMapping<MapEventList, MapEventType> = {
  onError: 'error',
  onClick: 'click',
  onLoad: 'load',
  onData: 'data',
  onDataLoading: 'dataloading',
  onRemove: 'remove',
  onRender: 'render',
  onResize: 'resize',
  onWebGlContextLost: 'webglcontextlost',
  onWebGlContextRestored: 'webglcontextrestored',
  onTileDataLoading: 'tiledataloading',
  onSourceData: 'sourcedata',
  onSourceDataLoading: 'sourcedataloading',
  onStyleData: 'styledata',
  onStyleDataLoading: 'styledataloading',
  onBoxZoomCancel: 'boxzoomcancel',
  onBoxZoomEnd: 'boxzoomend',
  onBoxZoomStart: 'boxzoomstart',
  onContextMenu: 'contextmenu',
  onTouchCancel: 'touchcancel',
  onTouchEnd: 'touchend',
  onTouchMove: 'touchmove',
  onTouchStart: 'touchstart',
  onDblClick: 'dblclick',
  onZoom: 'zoom',
  onZoomEnd: 'zoomend',
  onZoomStart: 'zoomstart',
  onDrag: 'drag',
  onDragEnd: 'dragend',
  onDragStart: 'dragstart',
  onMouseDown: 'mousedown',
  onMouseMove: 'mousemove',
  onMouseOut: 'mouseout',
  onMouseOver: 'mouseover',
  onMouseUp: 'mouseout',
  onMove: 'move',
  onMoveEnd: 'moveend',
  onMoveStart: 'movestart',
  onPitch: 'pitch',
  onPitchEnd: 'pitchend',
  onPitchStart: 'pitchstart',
  onRotate: 'rotate',
  onRotateEnd: 'rotateend',
  onRotateStart: 'rotatestart',
  onWheel: 'wheel'
}

export const eventsLayer: EventMapping<MapLayerEventList, MapLayerEventType> = {
  onClick: 'click',
  onDblClick: 'dblclick',
  onMouseDown: 'mousedown',
  onMouseUp: 'mouseup',
  onMouseMove: 'mousemove',
  onMouseEnter: 'mouseenter',
  onMouseLeave: 'mouseleave',
  onMouseOver: 'mouseover',
  onMouseOut: 'mouseout',
  onContextMenu: 'contextmenu',
  onTouchStart: 'touchstart',
  onTouchEnd: 'touchend',
  onTouchCancel: 'touchcancel'
}

export const eventsMarker: EventMapping<MarkerEventList, any> = {
  onDrag: 'drag',
  onDragEnd: 'dragend',
  onDragStart: 'dragstart'
}

export function addEvents<T = any, U = any>(
  eventsMap: EventMapping<T, U>,
  props: Partial<T>,
  map: mapboxgl.Map | mapboxgl.Marker
) {
  const keyList = Object.keys(eventsMap) as Array<keyof T>
  return keyList.reduce((listeners, name) => {
    const propEvent: any = props[name]
    if (!!propEvent) {
      const listener = (evt: any) => {
        propEvent(evt)
      }
      map.on(eventsMap[name] as any, listener)
      listeners[name] = listener
    }
    return listeners
  }, {} as Listeners<T>)
}
export function updateEvents<T = any, U = any>(
  listeners: Listeners<T>,
  nextProps: Partial<T>,
  map: mapboxgl.Map | mapboxgl.Marker,
  eventsMap: EventMapping<T, U>
) {
  const keyList = Object.keys(eventsMap) as Array<keyof T>
  const toListenOff = keyList.filter(
    (eventKey) =>
      !!listeners[eventKey] && typeof nextProps[eventKey] !== 'function'
  )
  toListenOff.forEach((key) => {
    map.off(eventsMap[key] as any, listeners[key]!)
    delete listeners[key]
  })
  const toListenOn = keyList
    .filter((key) => !listeners[key] && typeof nextProps[key] === 'function')
    .reduce((acc, next) => {
      acc[next] = eventsMap[next] as any
      return acc
    }, {} as EventMapping<T>)
  const newListeners = addEvents(toListenOn, nextProps, map)
  return { ...listeners, ...newListeners }
}
