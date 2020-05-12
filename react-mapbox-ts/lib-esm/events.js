var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
export var eventsMap = {
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
};
export var eventsLayer = {
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
};
export var eventsMarker = {
    onDrag: 'drag',
    onDragEnd: 'dragend',
    onDragStart: 'dragstart'
};
function MapEventDo(map, eventName, cb, action, layerId) {
    if (!!layerId) {
        map[action](eventName, layerId, cb);
    }
    else {
        map[action](eventName, cb);
    }
}
export function addEvents(eventsMap, props, map, layerId) {
    var keyList = Object.keys(eventsMap);
    var listenersList = keyList.reduce(function (listeners, name) {
        var propEvent = props[name];
        if (!!propEvent) {
            MapEventDo(map, eventsMap[name], propEvent, 'on', layerId);
            listeners[name] = propEvent;
        }
        return listeners;
    }, {});
    return listenersList;
}
export function updateEvents(listeners, nextProps, map, eventsMap, layerId) {
    var keyList = Object.keys(eventsMap);
    var toListenOff = keyList.filter(function (eventKey) {
        return ((!!listeners[eventKey] && typeof nextProps[eventKey] !== 'function') ||
            listeners[eventKey] !== nextProps[eventKey]);
    });
    toListenOff.forEach(function (key) {
        MapEventDo(map, eventsMap[key], listeners[key], 'off', layerId);
        delete listeners[key];
    });
    var toListenOn = keyList
        .filter(function (key) {
        return !listeners[key]
            ? typeof nextProps[key] === 'function'
            : listeners[key] !== nextProps[key];
    })
        .reduce(function (acc, next) {
        acc[next] = eventsMap[next];
        return acc;
    }, {});
    var newListeners = addEvents(toListenOn, nextProps, map, layerId);
    return __assign(__assign({}, listeners), newListeners);
}
