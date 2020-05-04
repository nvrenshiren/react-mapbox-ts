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
var mapbox_gl_1 = __importDefault(require("mapbox-gl"));
var react_1 = require("react");
var react_dom_1 = require("react-dom");
var context_1 = require("./components/context");
var Popup = react_1.forwardRef(function (props, ref) {
    var _a;
    var isMounted = react_1.useRef(false);
    var _b = react_1.useState(false), show = _b[0], setShow = _b[1];
    var map = react_1.useContext(context_1.MapContext).map;
    var prevPropsRef = react_1.useRef(__assign({}, props));
    var currentPropsRef = react_1.useRef(__assign({}, props));
    var children = props.children, positon = props.positon, withMarker = props.withMarker, _c = props.hidden, hidden = _c === void 0 ? false : _c, options = __rest(props, ["children", "positon", "withMarker", "hidden"]);
    currentPropsRef.current = props;
    var popupRef = react_1.useRef(new mapbox_gl_1.default.Popup(options).setHTML('<div class="popup-content"></div>'));
    var DidUpdate = react_1.useCallback(function () {
        var _a, _b, _c;
        var currentProps = currentPropsRef.current;
        if (!currentProps.withMarker) {
            (_a = popupRef.current) === null || _a === void 0 ? void 0 : _a.setLngLat(currentProps.positon);
            if (!show) {
                setShow(true);
                if (currentProps.hidden) {
                    (_b = popupRef.current) === null || _b === void 0 ? void 0 : _b.remove();
                }
                else {
                    (_c = popupRef.current) === null || _c === void 0 ? void 0 : _c.addTo(map);
                }
            }
        }
    }, [show]);
    var initPopup = react_1.useCallback(function () {
        var _a, _b;
        if (popupRef.current) {
            popupRef.current
                .on('open', function () {
                setShow(true);
            })
                .on('close', function () {
                setShow(false);
            });
            if (!!withMarker) {
                withMarker.setPopup(popupRef.current);
            }
            else {
                if (!!positon) {
                    (_a = popupRef.current) === null || _a === void 0 ? void 0 : _a.setLngLat(positon);
                    if (!hidden)
                        (_b = popupRef.current) === null || _b === void 0 ? void 0 : _b.addTo(map);
                }
                else {
                    throw new Error('独立使用的Popup必须添加position属性');
                }
            }
        }
    }, []);
    react_1.useEffect(function () {
        if (isMounted.current) {
            DidUpdate();
            prevPropsRef.current = __assign({}, props);
        }
    }, [props]);
    react_1.useEffect(function () {
        if (!isMounted.current) {
            isMounted.current = true;
            initPopup();
        }
    });
    react_1.useEffect(function () {
        !!ref &&
            (typeof ref === 'function'
                ? ref(popupRef.current)
                : (ref.current = popupRef.current));
    }, []);
    react_1.useEffect(function () {
        return function () {
            isMounted.current = false;
            popupRef.current && popupRef.current.off('open').off('close').remove();
        };
    }, []);
    return show && !hidden && !!((_a = popupRef.current) === null || _a === void 0 ? void 0 : _a.getElement())
        ? react_dom_1.createPortal(children, popupRef.current.getElement().querySelector('.popup-content'))
        : null;
});
exports.default = Popup;
