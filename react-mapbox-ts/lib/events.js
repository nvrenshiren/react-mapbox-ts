"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.eventsMap = {
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
exports.eventsLayer = {
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
exports.eventsMarker = {
    onDrag: 'drag',
    onDragEnd: 'dragend',
    onDragStart: 'dragstart'
};
function addEvents(eventsMap, props, map) {
    var keyList = Object.keys(eventsMap);
    return keyList.reduce(function (listeners, name) {
        var propEvent = props[name];
        if (!!propEvent) {
            var listener = function (evt) {
                propEvent(evt);
            };
            map.on(eventsMap[name], listener);
            listeners[name] = listener;
        }
        return listeners;
    }, {});
}
exports.addEvents = addEvents;
function updateEvents(listeners, nextProps, map, eventsMap) {
    var keyList = Object.keys(eventsMap);
    var toListenOff = keyList.filter(function (eventKey) {
        return !!listeners[eventKey] && typeof nextProps[eventKey] !== 'function';
    });
    toListenOff.forEach(function (key) {
        map.off(eventsMap[key], listeners[key]);
        delete listeners[key];
    });
    var toListenOn = keyList
        .filter(function (key) { return !listeners[key] && typeof nextProps[key] === 'function'; })
        .reduce(function (acc, next) {
        acc[next] = eventsMap[next];
        return acc;
    }, {});
    var newListeners = addEvents(toListenOn, nextProps, map);
    return __assign(__assign({}, listeners), newListeners);
}
exports.updateEvents = updateEvents;
