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
var fast_deep_equal_1 = __importDefault(require("fast-deep-equal"));
var react_1 = require("react");
var _1 = require(".");
var forceUpdate_1 = __importDefault(require("./components/forceUpdate"));
var CanvasSource = react_1.forwardRef(function (props, ref) {
    var isMounted = react_1.useRef(false);
    var forceUpdate = forceUpdate_1.default();
    var map = react_1.useContext(_1.MapContext).map;
    var sourceRef = react_1.useRef();
    var canvasRef = react_1.useRef();
    var prevPropsRef = react_1.useRef(__assign({}, props));
    var currentPropsRef = react_1.useRef(__assign({}, props));
    currentPropsRef.current = props;
    var children = props.children, id = props.id;
    var sourceID = react_1.useMemo(function () { return id; }, []);
    var DidUpdate = react_1.useCallback(function () {
        var _a, _b, _c;
        var currentProps = currentPropsRef.current;
        var prevProps = prevPropsRef.current;
        var option = currentProps.option;
        if (!fast_deep_equal_1.default(option, prevProps.option)) {
            (_a = sourceRef.current) === null || _a === void 0 ? void 0 : _a.setCoordinates(option.coordinates);
            if (!!option.animate) {
                (_b = sourceRef.current) === null || _b === void 0 ? void 0 : _b.play();
            }
            else {
                (_c = sourceRef.current) === null || _c === void 0 ? void 0 : _c.pause();
            }
        }
    }, []);
    var reRender = react_1.useCallback(function () {
        if (!(map === null || map === void 0 ? void 0 : map.getSource(sourceID))) {
            sourceRef.current = undefined;
            forceUpdate();
            initSource();
        }
    }, []);
    var addCanvas = react_1.useCallback(function () {
        var currentProps = currentPropsRef.current;
        if (!canvasRef.current) {
            canvasRef.current = document.createElement('canvas');
            canvasRef.current.width = currentProps.width || 400;
            canvasRef.current.height = currentProps.height || 400;
            document.body.appendChild(canvasRef.current);
        }
    }, []);
    var removeCanvas = react_1.useCallback(function () {
        canvasRef.current && canvasRef.current.remove();
        canvasRef.current = undefined;
    }, []);
    var initSource = react_1.useCallback(function () {
        var currentProps = currentPropsRef.current;
        if (!(map === null || map === void 0 ? void 0 : map.getSource(sourceID)) && !!canvasRef.current) {
            map === null || map === void 0 ? void 0 : map.addSource(sourceID, __assign(__assign({}, currentProps.option), { type: 'canvas', canvas: canvasRef.current }));
            sourceRef.current = map === null || map === void 0 ? void 0 : map.getSource(sourceID);
            sendRef();
            forceUpdate();
        }
    }, []);
    var removeSource = react_1.useCallback(function () {
        if (map === null || map === void 0 ? void 0 : map.getSource(sourceID)) {
            var layers = (map === null || map === void 0 ? void 0 : map.getStyle()).layers;
            layers === null || layers === void 0 ? void 0 : layers.filter(function (item) { return item.source === sourceID; }).forEach(function (item) { return !!map.getLayer(item.id) && map.removeLayer(item.id); });
            map.removeSource(sourceID);
            sourceRef.current = undefined;
        }
    }, []);
    var sendRef = react_1.useCallback(function () {
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
    var willMount = react_1.useCallback(function () {
        map === null || map === void 0 ? void 0 : map.on('style.load', reRender);
    }, []);
    react_1.useEffect(function () {
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
    react_1.useEffect(function () {
        return function () {
            map === null || map === void 0 ? void 0 : map.off('style.load', reRender);
            removeSource();
            removeCanvas();
        };
    }, []);
    return !!sourceRef.current && !!children ? children : null;
});
exports.default = CanvasSource;
