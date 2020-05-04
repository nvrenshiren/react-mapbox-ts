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
var ImageSource = react_1.forwardRef(function (props, ref) {
    console.log('ImageSource');
    var isMounted = react_1.useRef(false);
    var forceUpdate = forceUpdate_1.default();
    var map = react_1.useContext(_1.MapContext).map;
    var imageRef = react_1.useRef();
    var prevPropsRef = react_1.useRef(__assign({}, props));
    var currentPropsRef = react_1.useRef(__assign({}, props));
    currentPropsRef.current = props;
    var children = props.children, id = props.id;
    var sourceID = react_1.useMemo(function () { return id; }, []);
    var DidUpdate = react_1.useCallback(function () {
        var _a;
        var currentProps = currentPropsRef.current;
        var prevProps = prevPropsRef.current;
        var option = currentProps.option;
        if (!fast_deep_equal_1.default(option, prevProps.option)) {
            (_a = imageRef.current) === null || _a === void 0 ? void 0 : _a.updateImage(option);
        }
    }, []);
    var reRender = react_1.useCallback(function () {
        var _a;
        var layers = (_a = map === null || map === void 0 ? void 0 : map.getStyle().layers) === null || _a === void 0 ? void 0 : _a.filter(function (item) { return item.source === sourceID; });
        if (!(map === null || map === void 0 ? void 0 : map.getSource(sourceID)) || !(layers === null || layers === void 0 ? void 0 : layers.length)) {
            imageRef.current = undefined;
            forceUpdate();
            initSource();
        }
    }, []);
    var initSource = react_1.useCallback(function () {
        var currentProps = currentPropsRef.current;
        if (!(map === null || map === void 0 ? void 0 : map.getSource(sourceID))) {
            map === null || map === void 0 ? void 0 : map.addSource(sourceID, __assign(__assign({}, currentProps.option), { type: 'image' }));
            map === null || map === void 0 ? void 0 : map.on('sourcedata', getSource);
        }
    }, []);
    var removeSource = react_1.useCallback(function () {
        if (map === null || map === void 0 ? void 0 : map.getSource(sourceID)) {
            var layers = (map === null || map === void 0 ? void 0 : map.getStyle()).layers;
            layers === null || layers === void 0 ? void 0 : layers.filter(function (item) { return item.source === sourceID; }).forEach(function (item) { return !!map.getLayer(item.id) && map.removeLayer(item.id); });
            map.removeSource(sourceID);
        }
    }, []);
    var getSource = react_1.useCallback(function () {
        var currentProps = currentPropsRef.current;
        imageRef.current = map === null || map === void 0 ? void 0 : map.getSource(sourceID);
        if (!imageRef.current || !(map === null || map === void 0 ? void 0 : map.isSourceLoaded(sourceID))) {
            return;
        }
        if (imageRef.current && !!currentProps.option) {
        }
        !!ref &&
            (typeof ref === 'function'
                ? ref(imageRef.current)
                : (ref.current = imageRef.current));
        map === null || map === void 0 ? void 0 : map.off('sourcedata', getSource);
        forceUpdate();
    }, []);
    var willMount = react_1.useCallback(function () {
        map === null || map === void 0 ? void 0 : map.on('styledata', reRender);
    }, []);
    react_1.useEffect(function () {
        if (!isMounted.current) {
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
            map === null || map === void 0 ? void 0 : map.off('styledata', reRender);
            removeSource();
            console.log('removeImageSource');
        };
    }, []);
    return !!(map === null || map === void 0 ? void 0 : map.getSource(sourceID)) && !!children ? children : null;
});
exports.default = ImageSource;
