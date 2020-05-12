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
import { forwardRef, useCallback, useContext, useEffect, useMemo, useRef } from 'react';
import { MapContext } from '.';
import { addEvents, eventsMap, updateEvents } from './events';
var CustomLayer = forwardRef(function (props, ref) {
    var isMounted = useRef(false);
    var map = useContext(MapContext).map;
    var eventRef = useRef({});
    var layerRef = useRef();
    var prevPropsRef = useRef(__assign({}, props));
    var currentPropsRef = useRef(__assign({}, props));
    var layerID = useMemo(function () { return props.data.id; }, []);
    currentPropsRef.current = props;
    var DidUpdate = useCallback(function () {
        var currentProps = currentPropsRef.current;
        var prevProps = prevPropsRef.current;
        eventRef.current = updateEvents(eventRef.current, currentProps, map, eventsMap, layerID);
        if (!!currentProps.before && currentProps.before !== prevProps.before) {
            map === null || map === void 0 ? void 0 : map.moveLayer(layerID, currentProps.before);
        }
    }, []);
    var removeLayer = useCallback(function () {
        !!(map === null || map === void 0 ? void 0 : map.getLayer(layerID)) && (map === null || map === void 0 ? void 0 : map.removeLayer(layerID));
    }, []);
    var initLayer = useCallback(function () {
        if (!(map === null || map === void 0 ? void 0 : map.getLayer(layerID))) {
            var currentProps = currentPropsRef.current;
            var before = currentProps.before, data = currentProps.data;
            map === null || map === void 0 ? void 0 : map.addLayer(data, before || undefined);
            sendRef();
        }
    }, []);
    var reRender = useCallback(function () {
        if (!(map === null || map === void 0 ? void 0 : map.getLayer(layerID))) {
            initLayer();
        }
    }, []);
    var willMount = useCallback(function () {
        map === null || map === void 0 ? void 0 : map.on('style.load', reRender);
    }, []);
    useEffect(function () {
        if (!isMounted.current) {
            isMounted.current = true;
            initLayer();
            willMount();
        }
        else {
            DidUpdate();
            prevPropsRef.current = __assign({}, props);
        }
    });
    var sendRef = useCallback(function () {
        layerRef.current = map === null || map === void 0 ? void 0 : map.getLayer(layerID);
        !!ref &&
            (typeof ref === 'function'
                ? ref(layerRef.current)
                : (ref.current = layerRef.current));
    }, []);
    useEffect(function () {
        eventRef.current = addEvents(eventsMap, props, map, layerID);
    }, []);
    useEffect(function () {
        return function () {
            map === null || map === void 0 ? void 0 : map.off('style.load', reRender);
            removeLayer();
        };
    }, []);
    return null;
});
export default CustomLayer;
