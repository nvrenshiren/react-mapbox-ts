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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var mapbox_gl_1 = __importDefault(require("mapbox-gl"));
var react_1 = __importStar(require("react"));
var react_dom_1 = require("react-dom");
var context_1 = require("./components/context");
var events_1 = require("./events");
var utils_1 = require("./utils");
var Marker = react_1.forwardRef(function (props, ref) {
    var isMounted = react_1.useRef(false);
    var map = react_1.useContext(context_1.MapContext).map;
    var _a = react_1.useState(false), show = _a[0], setShow = _a[1];
    var prevPropsRef = react_1.useRef(__assign({}, props));
    var currentPropsRef = react_1.useRef(__assign({}, props));
    currentPropsRef.current = props;
    var eventRef = react_1.useRef({});
    var children = props.children, positon = props.positon, popup = props.popup, popupOption = props.popupOption, options = __rest(props, ["children", "positon", "popup", "popupOption"]);
    var markerRef = react_1.useRef(new mapbox_gl_1.default.Marker(__assign(__assign({}, options), { element: !!props.children ? document.createElement('div') : undefined })).setLngLat(positon));
    var popupRef = react_1.useRef(!!props.popup
        ? new mapbox_gl_1.default.Popup(popupOption)
            .setHTML('<div class="popup-content"></div>')
            .addTo(map)
        : null);
    var DidUpdate = react_1.useCallback(function () {
        var currentProps = currentPropsRef.current;
        var prevProps = prevPropsRef.current;
        eventRef.current = events_1.updateEvents(eventRef.current, currentProps, markerRef.current, events_1.eventsMarker);
        var didPositionUpdate = utils_1.diffLngLat(markerRef.current.getLngLat(), currentProps.positon);
        var didOffsetUpdate = prevProps.offset !== currentProps.offset &&
            currentProps.offset !== markerRef.current.getOffset();
        var didDraggableUpdate = !!prevProps.draggable !== !!currentProps.draggable;
        if (didPositionUpdate)
            markerRef.current.setLngLat(currentProps.positon);
        if (didOffsetUpdate && currentProps.offset)
            markerRef.current.setOffset(currentProps.offset);
        if (didDraggableUpdate)
            markerRef.current.setDraggable(!!currentProps.draggable);
    }, []);
    react_1.useEffect(function () {
        if (!isMounted.current) {
            isMounted.current = true;
            if (props.popup && popupRef.current) {
                markerRef.current.setPopup(popupRef.current);
                popupRef.current
                    .on('open', function () {
                    setShow(true);
                })
                    .on('close', function () {
                    setShow(false);
                });
            }
            markerRef.current.addTo(map);
        }
        else {
            DidUpdate();
            prevPropsRef.current = __assign({}, props);
        }
    });
    react_1.useEffect(function () {
        !!ref &&
            (typeof ref === 'function'
                ? ref(markerRef.current)
                : (ref.current = markerRef.current));
        eventRef.current = events_1.addEvents(events_1.eventsMarker, props, markerRef.current);
    }, []);
    react_1.useEffect(function () {
        return function () {
            isMounted.current = false;
            markerRef.current.remove();
            popupRef.current && popupRef.current.off('open').off('close').remove();
        };
    }, []);
    var popupEle = react_1.useMemo(function () {
        if (!!props.popup && popupRef.current && show) {
            return react_dom_1.createPortal(props.popup, popupRef.current.getElement().querySelector('.popup-content'));
        }
        return null;
    }, [show]);
    return (react_1.default.createElement(react_1.default.Fragment, null,
        props.children
            ? react_dom_1.createPortal(props.children, markerRef.current.getElement())
            : null,
        popupEle));
});
exports.default = Marker;
