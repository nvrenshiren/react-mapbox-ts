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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import mapboxgl from 'mapbox-gl';
import React, { forwardRef, useCallback, useContext, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { MapContext } from './components/context';
import { addEvents, eventsMarker, updateEvents } from './events';
import Popup from './popup';
import { diffLngLat } from './utils';
var Marker = forwardRef(function (props, ref) {
    var isMounted = useRef(false);
    var map = useContext(MapContext).map;
    var prevPropsRef = useRef(__assign({}, props));
    var currentPropsRef = useRef(__assign({}, props));
    currentPropsRef.current = props;
    var eventRef = useRef({});
    var children = props.children, positon = props.positon, _a = props.show, show = _a === void 0 ? true : _a, popup = props.popup, popupOption = props.popupOption, options = __rest(props, ["children", "positon", "show", "popup", "popupOption"]);
    var markerRef = useRef(new mapboxgl.Marker(__assign(__assign({}, options), { element: !!children ? document.createElement('div') : undefined })).setLngLat(positon));
    var DidUpdate = useCallback(function () {
        var currentProps = currentPropsRef.current;
        var prevProps = prevPropsRef.current;
        eventRef.current = updateEvents(eventRef.current, currentProps, markerRef.current, eventsMarker);
        var didShowUpdate = currentProps.show !== prevProps.show;
        if (didShowUpdate)
            markerRef.current[!!currentProps.show ? 'addTo' : 'remove'](map);
        var didPositionUpdate = diffLngLat(markerRef.current.getLngLat(), currentProps.positon);
        var didOffsetUpdate = prevProps.offset !== currentProps.offset &&
            currentProps.offset !== markerRef.current.getOffset();
        var didDraggableUpdate = !!prevProps.draggable !== !!currentProps.draggable;
        if (didPositionUpdate)
            markerRef.current.setLngLat(currentProps.positon);
        if (didOffsetUpdate && currentProps.offset)
            markerRef.current.setOffset(currentProps.offset);
        if (didDraggableUpdate)
            markerRef.current.setDraggable(!!currentProps.draggable);
    }, []);
    useEffect(function () {
        if (!isMounted.current) {
            isMounted.current = true;
            markerRef.current[show ? 'addTo' : 'remove'](map);
        }
        else {
            DidUpdate();
            prevPropsRef.current = __assign({}, props);
        }
    });
    useEffect(function () {
        !!ref &&
            (typeof ref === 'function'
                ? ref(markerRef.current)
                : (ref.current = markerRef.current));
        eventRef.current = addEvents(eventsMarker, props, markerRef.current);
    }, []);
    useEffect(function () {
        return function () {
            isMounted.current = false;
            markerRef.current.remove();
        };
    }, []);
    return (React.createElement(React.Fragment, null,
        children ? createPortal(children, markerRef.current.getElement()) : null,
        !!popup && (React.createElement(Popup, __assign({}, popupOption, { withMarker: markerRef.current }), popup))));
});
export default Marker;
