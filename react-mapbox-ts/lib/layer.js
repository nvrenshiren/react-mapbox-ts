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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fast_deep_equal_1 = __importDefault(require("fast-deep-equal"));
var react_1 = require("react");
var _1 = require(".");
var events_1 = require("./events");
var utils_1 = require("./utils");
var Layer = react_1.forwardRef(function (props, ref) {
    var isMounted = react_1.useRef(false);
    var map = react_1.useContext(_1.MapContext).map;
    var eventRef = react_1.useRef({});
    var layerRef = react_1.useRef();
    var prevPropsRef = react_1.useRef(__assign({}, props));
    var currentPropsRef = react_1.useRef(__assign({}, props));
    var layerID = react_1.useMemo(function () { return props.id; }, []);
    currentPropsRef.current = props;
    var DidUpdate = react_1.useCallback(function () {
        var currentProps = currentPropsRef.current;
        var prevProps = prevPropsRef.current;
        eventRef.current = events_1.updateEvents(eventRef.current, currentProps, map, events_1.eventsLayer, layerID);
        var currentLayou = currentProps.layout || {};
        var prevLayou = prevProps.layout || {};
        if (!fast_deep_equal_1.default(currentLayou, prevLayou)) {
            var diffLayout_1 = utils_1.getDiffData(prevLayou, currentLayou);
            Object.keys(diffLayout_1).forEach(function (key) {
                map === null || map === void 0 ? void 0 : map.setLayoutProperty(layerID, key, diffLayout_1[key]);
            });
        }
        var currentPaint = currentProps.paint || {};
        var prevPaint = prevProps.paint || {};
        if (!fast_deep_equal_1.default(currentPaint, prevPaint)) {
            var diffPaint_1 = utils_1.getDiffData(prevPaint, currentPaint);
            Object.keys(diffPaint_1).forEach(function (key) {
                map === null || map === void 0 ? void 0 : map.setPaintProperty(layerID, key, diffPaint_1[key]);
            });
        }
        var currentFilter = currentProps.filter || [];
        var prevFilter = prevProps.filter || [];
        if (!fast_deep_equal_1.default(currentFilter.toString(), prevFilter.toString())) {
            map === null || map === void 0 ? void 0 : map.setFilter(layerID, currentFilter);
        }
        var mapMaxZoom = map === null || map === void 0 ? void 0 : map.getMaxZoom();
        var mapMinZoom = map === null || map === void 0 ? void 0 : map.getMinZoom();
        var currentZoom = [
            currentProps.minzoom || mapMinZoom,
            currentProps.maxzoom || mapMaxZoom
        ];
        var prevZoom = [
            prevProps.minzoom || mapMinZoom,
            prevProps.maxzoom || mapMaxZoom
        ];
        if (!fast_deep_equal_1.default(currentZoom.toString(), prevZoom.toString())) {
            map === null || map === void 0 ? void 0 : map.setLayerZoomRange(layerID, currentZoom[0], currentZoom[1]);
        }
        if (!!currentProps.before && currentProps.before !== prevProps.before) {
            map === null || map === void 0 ? void 0 : map.moveLayer(layerID, currentProps.before);
        }
    }, []);
    var removeLayer = react_1.useCallback(function () {
        !!(map === null || map === void 0 ? void 0 : map.getLayer(layerID)) && (map === null || map === void 0 ? void 0 : map.removeLayer(layerID));
    }, []);
    var initLayer = react_1.useCallback(function () {
        var currentProps = currentPropsRef.current;
        var onClick = currentProps.onClick, onContextMenu = currentProps.onContextMenu, onDblClick = currentProps.onDblClick, onMouseDown = currentProps.onMouseDown, onMouseEnter = currentProps.onMouseEnter, onMouseLeave = currentProps.onMouseLeave, onMouseMove = currentProps.onMouseMove, onMouseOut = currentProps.onMouseOut, onMouseOver = currentProps.onMouseOver, onMouseUp = currentProps.onMouseUp, onTouchCancel = currentProps.onTouchCancel, onTouchEnd = currentProps.onTouchEnd, onTouchStart = currentProps.onTouchStart, sourceLayer = currentProps.sourceLayer, before = currentProps.before, id = currentProps.id, options = __rest(currentProps, ["onClick", "onContextMenu", "onDblClick", "onMouseDown", "onMouseEnter", "onMouseLeave", "onMouseMove", "onMouseOut", "onMouseOver", "onMouseUp", "onTouchCancel", "onTouchEnd", "onTouchStart", "sourceLayer", "before", "id"]);
        var layOption = __assign(__assign(__assign({}, options), { id: id }), (sourceLayer ? { 'source-layer': sourceLayer } : null));
        if (!!before) {
            if (!!(map === null || map === void 0 ? void 0 : map.getLayer(before))) {
                map === null || map === void 0 ? void 0 : map.addLayer(layOption, before);
            }
            else {
                setTimeout(initLayer, 100);
            }
        }
        else {
            map === null || map === void 0 ? void 0 : map.addLayer(layOption);
        }
    }, []);
    react_1.useEffect(function () {
        if (!isMounted.current) {
            isMounted.current = true;
            initLayer();
        }
        else {
            DidUpdate();
            prevPropsRef.current = __assign({}, props);
        }
    });
    react_1.useEffect(function () {
        layerRef.current = map === null || map === void 0 ? void 0 : map.getLayer(layerID);
        !!ref &&
            (typeof ref === 'function'
                ? ref(layerRef.current)
                : (ref.current = layerRef.current));
        eventRef.current = events_1.addEvents(events_1.eventsLayer, props, map, layerID);
    }, []);
    react_1.useEffect(function () {
        return function () {
            removeLayer();
        };
    }, []);
    return null;
});
exports.default = Layer;
