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
var CanvasSource = forwardRef(function (props, ref) {
    var isMounted = useRef(false);
    var forceUpdate = useForceUpdate();
    var map = useContext(MapContext).map;
    var sourceRef = useRef();
    var canvasRef = useRef();
    var prevPropsRef = useRef(__assign({}, props));
    var currentPropsRef = useRef(__assign({}, props));
    currentPropsRef.current = props;
    var children = props.children, id = props.id;
    var sourceID = useMemo(function () { return id; }, []);
    var DidUpdate = useCallback(function () {
        var _a, _b, _c;
        var currentProps = currentPropsRef.current;
        var prevProps = prevPropsRef.current;
        var option = currentProps.option;
        if (!equal(option, prevProps.option)) {
            (_a = sourceRef.current) === null || _a === void 0 ? void 0 : _a.setCoordinates(option.coordinates);
            if (!!option.animate) {
                (_b = sourceRef.current) === null || _b === void 0 ? void 0 : _b.play();
            }
            else {
                (_c = sourceRef.current) === null || _c === void 0 ? void 0 : _c.pause();
            }
        }
    }, []);
    var reRender = useCallback(function () {
        if (!(map === null || map === void 0 ? void 0 : map.getSource(sourceID))) {
            sourceRef.current = undefined;
            forceUpdate();
            initSource();
        }
    }, []);
    var addCanvas = useCallback(function () {
        var currentProps = currentPropsRef.current;
        if (!canvasRef.current) {
            canvasRef.current = document.createElement('canvas');
            canvasRef.current.width = currentProps.width || 400;
            canvasRef.current.height = currentProps.height || 400;
            document.body.appendChild(canvasRef.current);
        }
    }, []);
    var removeCanvas = useCallback(function () {
        canvasRef.current && canvasRef.current.remove();
        canvasRef.current = undefined;
    }, []);
    var initSource = useCallback(function () {
        var currentProps = currentPropsRef.current;
        if (!(map === null || map === void 0 ? void 0 : map.getSource(sourceID)) && !!canvasRef.current) {
            map === null || map === void 0 ? void 0 : map.addSource(sourceID, __assign(__assign({}, currentProps.option), { type: 'canvas', canvas: canvasRef.current }));
            sourceRef.current = map === null || map === void 0 ? void 0 : map.getSource(sourceID);
            sendRef();
            forceUpdate();
        }
    }, []);
    var removeSource = useCallback(function () {
        if (map === null || map === void 0 ? void 0 : map.getSource(sourceID)) {
            var layers = (map === null || map === void 0 ? void 0 : map.getStyle()).layers;
            layers === null || layers === void 0 ? void 0 : layers.filter(function (item) { return item.source === sourceID; }).forEach(function (item) { return !!map.getLayer(item.id) && map.removeLayer(item.id); });
            map.removeSource(sourceID);
            sourceRef.current = undefined;
        }
    }, []);
    var sendRef = useCallback(function () {
        !!ref &&
            (typeof ref === 'function'
                ? ref({
                    canvas: canvasRef.current,
                    source: sourceRef.current
                })
                : (ref.current = {
                    canvas: canvasRef.current,
                    source: sourceRef.current
                }));
    }, []);
    var willMount = useCallback(function () {
        map === null || map === void 0 ? void 0 : map.on('style.load', reRender);
    }, []);
    useEffect(function () {
        if (!isMounted.current) {
            addCanvas();
            initSource();
            willMount();
            isMounted.current = true;
        }
        else {
            DidUpdate();
            prevPropsRef.current = __assign({}, props);
        }
    });
    useEffect(function () {
        return function () {
            map === null || map === void 0 ? void 0 : map.off('style.load', reRender);
            removeSource();
            removeCanvas();
        };
    }, []);
    return !!sourceRef.current && !!children ? children : null;
});
export default CanvasSource;
