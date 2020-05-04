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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var _1 = require(".");
var forceUpdate_1 = __importDefault(require("./components/forceUpdate"));
var events_1 = require("./events");
var CustomLayer = react_1.forwardRef(function (props, ref) {
    console.log('CustomLayer');
    var isMounted = react_1.useRef(false);
    var forceUpdate = forceUpdate_1.default();
    var map = react_1.useContext(_1.MapContext).map;
    var eventRef = react_1.useRef({});
    var layerRef = react_1.useRef();
    var prevPropsRef = react_1.useRef(__assign({}, props));
    var currentPropsRef = react_1.useRef(__assign({}, props));
    var layerID = react_1.useMemo(function () { return props.data.id; }, []);
    currentPropsRef.current = props;
    var DidUpdate = react_1.useCallback(function () {
        var currentProps = currentPropsRef.current;
        var prevProps = prevPropsRef.current;
        eventRef.current = events_1.updateEvents(eventRef.current, currentProps, map, events_1.eventsMap, layerID);
        if (!!currentProps.before && currentProps.before !== prevProps.before) {
            map === null || map === void 0 ? void 0 : map.moveLayer(layerID, currentProps.before);
        }
    }, []);
    var removeLayer = react_1.useCallback(function () {
        !!(map === null || map === void 0 ? void 0 : map.getLayer(layerID)) && (map === null || map === void 0 ? void 0 : map.removeLayer(layerID));
    }, []);
    var initLayer = react_1.useCallback(function () {
        if (!(map === null || map === void 0 ? void 0 : map.getLayer(layerID))) {
            var currentProps = currentPropsRef.current;
            var before = currentProps.before, data = currentProps.data;
            map === null || map === void 0 ? void 0 : map.addLayer(data, before || undefined);
            sendRef();
        }
    }, []);
    var reRender = react_1.useCallback(function () {
        if (!(map === null || map === void 0 ? void 0 : map.getLayer(layerID))) {
            initLayer();
        }
    }, []);
    var willMount = react_1.useCallback(function () {
        map === null || map === void 0 ? void 0 : map.on('styledata', reRender);
    }, []);
    react_1.useEffect(function () {
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
    var sendRef = react_1.useCallback(function () {
        layerRef.current = map === null || map === void 0 ? void 0 : map.getLayer(layerID);
        !!ref &&
            (typeof ref === 'function'
                ? ref(layerRef.current)
                : (ref.current = layerRef.current));
    }, []);
    react_1.useEffect(function () {
        eventRef.current = events_1.addEvents(events_1.eventsMap, props, map, layerID);
    }, []);
    react_1.useEffect(function () {
        return function () {
            console.log('removeLayer');
            map === null || map === void 0 ? void 0 : map.off('styledata', reRender);
            removeLayer();
        };
    }, []);
    return null;
});
exports.default = CustomLayer;
