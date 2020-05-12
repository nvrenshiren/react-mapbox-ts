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
var AddImage = react_1.forwardRef(function (props, ref) {
    var isMounted = react_1.useRef(false);
    var forceUpdate = _1.useForceUpdate();
    var map = react_1.useContext(_1.MapContext).map;
    var prevPropsRef = react_1.useRef(__assign({}, props));
    var currentPropsRef = react_1.useRef(__assign({}, props));
    currentPropsRef.current = props;
    var imgRef = react_1.useRef();
    var children = props.children, name = props.name;
    var imageName = react_1.useMemo(function () { return name; }, []);
    var DidUpdate = react_1.useCallback(function () {
        var currentProps = currentPropsRef.current;
        var prevProps = prevPropsRef.current;
        var image = currentProps.image;
        if (!fast_deep_equal_1.default(image, prevProps.image)) {
            map === null || map === void 0 ? void 0 : map.updateImage(imageName, image);
        }
    }, []);
    var removeImage = react_1.useCallback(function () {
        if (map && map.hasImage('imageName')) {
            map.removeImage(imageName);
        }
    }, []);
    var getImage = react_1.useCallback(function () {
        var currentProps = currentPropsRef.current;
        var image = currentProps.image, options = currentProps.options;
        map === null || map === void 0 ? void 0 : map.addImage(imageName, image, options);
        imgRef.current = image;
        forceUpdate();
    }, []);
    var reRender = react_1.useCallback(function () {
        if (!(map === null || map === void 0 ? void 0 : map.hasImage(imageName))) {
            imgRef.current = undefined;
            getImage();
        }
    }, []);
    var willMount = react_1.useCallback(function () {
        map === null || map === void 0 ? void 0 : map.on('style.load', reRender);
    }, []);
    react_1.useEffect(function () {
        if (!isMounted.current) {
            willMount();
            getImage();
            isMounted.current = true;
        }
        else {
            DidUpdate();
            prevPropsRef.current = __assign({}, props);
        }
    });
    react_1.useEffect(function () {
        return function () {
            removeImage();
            map === null || map === void 0 ? void 0 : map.off('style.load', reRender);
        };
    }, []);
    return !!imgRef.current && !!children ? children : null;
});
exports.default = AddImage;
