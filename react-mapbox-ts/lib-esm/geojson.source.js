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
import equal from 'fast-deep-equal';
import { forwardRef, useCallback, useContext, useEffect, useRef, useMemo } from 'react';
import { MapContext } from '.';
import useForceUpdate from './components/forceUpdate';
var GeoJSONSource = forwardRef(function (props, ref) {
    var isMounted = useRef(false);
    var forceUpdate = useForceUpdate();
    var map = useContext(MapContext).map;
    var sourceRef = useRef();
    var prevPropsRef = useRef(props);
    var currentPropsRef = useRef(props);
    currentPropsRef.current = props;
    var children = props.children, id = props.id;
    var sourceID = useMemo(function () { return id; }, []);
    var DidUpdate = useCallback(function () {
        var _a;
        var currentProps = currentPropsRef.current;
        var prevProps = prevPropsRef.current;
        var option = currentProps.option;
        if (!equal(option.data, prevProps.option.data) ||
            JSON.stringify(option.data) !== JSON.stringify(prevProps.option.data)) {
            (_a = sourceRef.current) === null || _a === void 0 ? void 0 : _a.setData(option.data);
        }
    }, []);
    var reRender = useCallback(function (e) {
        if (!(map === null || map === void 0 ? void 0 : map.getSource(sourceID))) {
            sourceRef.current = undefined;
            forceUpdate();
            initSource();
        }
    }, []);
    var initSource = useCallback(function () {
        var currentProps = currentPropsRef.current;
        if (!(map === null || map === void 0 ? void 0 : map.getSource(sourceID))) {
            map === null || map === void 0 ? void 0 : map.addSource(sourceID, __assign(__assign({}, currentProps.option), { type: 'geojson' }));
            map === null || map === void 0 ? void 0 : map.on('sourcedata', getSource);
        }
    }, []);
    var removeSource = useCallback(function () {
        if (map === null || map === void 0 ? void 0 : map.getSource(sourceID)) {
            var layers = (map === null || map === void 0 ? void 0 : map.getStyle()).layers;
            layers === null || layers === void 0 ? void 0 : layers.filter(function (item) { return item.source === sourceID; }).forEach(function (item) { return !!map.getLayer(item.id) && map.removeLayer(item.id); });
            map.removeSource(sourceID);
        }
    }, []);
    var getSource = useCallback(function () {
        var currentProps = currentPropsRef.current;
        sourceRef.current = map === null || map === void 0 ? void 0 : map.getSource(sourceID);
        if (!sourceRef.current || !(map === null || map === void 0 ? void 0 : map.isSourceLoaded(sourceID))) {
            return;
        }
        if (sourceRef.current && !!currentProps.option.data) {
        }
        !!ref &&
            (typeof ref === 'function'
                ? ref(sourceRef.current)
                : (ref.current = sourceRef.current));
        map === null || map === void 0 ? void 0 : map.off('sourcedata', getSource);
        forceUpdate();
    }, []);
    var willMount = useCallback(function () {
        map === null || map === void 0 ? void 0 : map.on('style.load', reRender);
    }, []);
    useEffect(function () {
        if (!isMounted.current) {
            initSource();
            willMount();
            isMounted.current = true;
        }
        else {
            DidUpdate();
            prevPropsRef.current = __assign(__assign({}, props), { option: {
                    data: props.option.data
                        ? JSON.parse(JSON.stringify(props.option.data))
                        : {}
                } });
        }
    });
    useEffect(function () {
        return function () {
            map === null || map === void 0 ? void 0 : map.off('style.load', reRender);
            removeSource();
        };
    }, []);
    return !!sourceRef.current && !!children ? children : null;
});
export default GeoJSONSource;
