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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fast_deep_equal_1 = __importDefault(require("fast-deep-equal"));
var react_1 = __importStar(require("react"));
var _1 = require(".");
var add_image_1 = __importDefault(require("./add.image"));
var LoadImage = react_1.forwardRef(function (props, ref) {
    var isMounted = react_1.useRef(false);
    var forceUpdate = _1.useForceUpdate();
    var map = react_1.useContext(_1.MapContext).map;
    var prevPropsRef = react_1.useRef(__assign({}, props));
    var currentPropsRef = react_1.useRef(__assign({}, props));
    currentPropsRef.current = props;
    var imgRef = react_1.useRef();
    var name = props.name, options = props.options, children = props.children;
    var imageName = react_1.useMemo(function () { return name; }, []);
    var DidUpdate = react_1.useCallback(function () {
        var currentProps = currentPropsRef.current;
        var prevProps = prevPropsRef.current;
        var url = currentProps.url;
        if (!fast_deep_equal_1.default(url, prevProps.url)) {
            getImage();
        }
    }, []);
    var removeImage = react_1.useCallback(function () {
        if (map && map.hasImage(imageName)) {
            map.removeImage(imageName);
        }
    }, []);
    var getImage = react_1.useCallback(function () {
        var currentProps = currentPropsRef.current;
        var url = currentProps.url;
        map === null || map === void 0 ? void 0 : map.loadImage(url, function (error, image) {
            if (error) {
                throw error;
            }
            else {
                imgRef.current = image;
                forceUpdate();
            }
        });
    }, []);
    react_1.useEffect(function () {
        if (!isMounted.current) {
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
        };
    }, []);
    return !!imgRef.current ? (react_1.default.createElement(add_image_1.default, { name: imageName, ref: ref, image: imgRef.current, options: options }, children)) : null;
});
exports.default = LoadImage;
