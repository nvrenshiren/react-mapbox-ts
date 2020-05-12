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
var fast_deep_equal_1 = __importDefault(require("fast-deep-equal"));
var mapbox_gl_1 = __importDefault(require("mapbox-gl"));
var react_1 = __importStar(require("react"));
var context_1 = require("./components/context");
var events_1 = require("./events");
var Map = react_1.default.forwardRef(function (props, ref) {
    var isMounted = react_1.useRef(false);
    var _a = react_1.useState(null), map = _a[0], setMap = _a[1];
    var divRef = react_1.useRef(document.createElement('div'));
    var eventRef = react_1.useRef({});
    var prevPropsRef = react_1.useRef(__assign({}, props));
    var currentPropsRef = react_1.useRef(__assign({}, props));
    currentPropsRef.current = props;
    var baseapiurl = props.baseapiurl, workercount = props.workercount, maxparallelimagerequests = props.maxparallelimagerequests, setRTLTextPlugin = props.setRTLTextPlugin, divStyle = props.divStyle, divClass = props.divClass, _b = props.injectCSS, injectCSS = _b === void 0 ? true : _b, _c = props.movingMethod, movingMethod = _c === void 0 ? 'jumpTo' : _c, animationOptions = props.animationOptions, fitBounds = props.fitBounds, flyToOptions = props.flyToOptions, children = props.children, mapboxOpts = __rest(props, ["baseapiurl", "workercount", "maxparallelimagerequests", "setRTLTextPlugin", "divStyle", "divClass", "injectCSS", "movingMethod", "animationOptions", "fitBounds", "flyToOptions", "children"]);
    var DidUpdate = react_1.useCallback(function () {
        if (map) {
            var currentProps_1 = currentPropsRef.current;
            var prevProps_1 = prevPropsRef.current;
            eventRef.current = events_1.updateEvents(eventRef.current, currentProps_1, map, events_1.eventsMap);
            var didZoomUpdate = prevProps_1.zoom !== currentProps_1.zoom;
            var didBearingUpdate = prevProps_1.bearing !== currentProps_1.bearing;
            var didPitchUpdate = prevProps_1.pitch !== currentProps_1.pitch;
            var didCenterUpdate = !fast_deep_equal_1.default(prevProps_1.center, currentProps_1.center);
            if (currentProps_1.fitBounds) {
                var fitBounds_1 = prevProps_1.fitBounds;
                var didFitBoundsUpdate = fitBounds_1 !== currentProps_1.fitBounds ||
                    currentProps_1.fitBounds.length !== (fitBounds_1 && fitBounds_1.length) ||
                    !!fitBounds_1.filter(function (c, i) {
                        var nc = currentProps_1.fitBounds && currentProps_1.fitBounds[i];
                        return c[0] !== (nc && nc[0]) || c[1] !== (nc && nc[1]);
                    })[0];
                if (didFitBoundsUpdate ||
                    !fast_deep_equal_1.default(prevProps_1.fitBoundsOptions, currentProps_1.fitBoundsOptions)) {
                    map.fitBounds(currentProps_1.fitBounds, currentProps_1.fitBoundsOptions, {
                        fitboundUpdate: true
                    });
                }
            }
            if (!!currentProps_1.style && !fast_deep_equal_1.default(prevProps_1.style, currentProps_1.style)) {
                map.setStyle(currentProps_1.style);
            }
            if (prevProps_1.renderWorldCopies !== currentProps_1.renderWorldCopies) {
                map.setRenderWorldCopies(currentProps_1.renderWorldCopies);
            }
            var interActions = [
                'scrollZoom',
                'boxZoom',
                'dragRotate',
                'dragPan',
                'keyboard',
                'doubleClickZoom',
                'touchZoomRotate'
            ];
            interActions.forEach(function (key) {
                if (prevProps_1[key] !== currentProps_1[key]) {
                    map[key][currentProps_1[key] ? 'enable' : 'disable']();
                }
            });
            var MaxMinConfs = [
                'maxBounds',
                'maxZoom',
                'minZoom',
                'minPitch',
                'maxPitch'
            ];
            MaxMinConfs.forEach(function (key) {
                if (prevProps_1[key] !== currentProps_1[key]) {
                    map["set" + (key.charAt(0).toUpperCase() + key.slice(1))](currentProps_1[key]);
                }
            });
            if (didZoomUpdate ||
                didCenterUpdate ||
                didBearingUpdate ||
                didPitchUpdate) {
                var movingMethod_1 = currentProps_1.movingMethod || 'flyTo';
                map[movingMethod_1](__assign(__assign(__assign({}, currentProps_1.animationOptions), currentProps_1.flyToOptions), { zoom: (didZoomUpdate && currentProps_1.zoom) || map.getZoom(), center: (didCenterUpdate && currentProps_1.center) || map.getCenter(), bearing: (didBearingUpdate && currentProps_1.bearing) || map.getBearing(), pitch: (didPitchUpdate && currentProps_1.pitch) || map.getPitch() }));
            }
        }
    }, [map]);
    var initMap = react_1.useCallback(function () {
        if (injectCSS) {
            require('mapbox-gl/dist/mapbox-gl.css');
        }
        mapbox_gl_1.default.prewarm();
        if (baseapiurl) {
            mapbox_gl_1.default.baseApiUrl = baseapiurl;
        }
        if (workercount) {
            mapbox_gl_1.default.workerCount = workercount;
        }
        if (maxparallelimagerequests) {
            mapbox_gl_1.default.maxParallelImageRequests = maxparallelimagerequests;
        }
        if (setRTLTextPlugin) {
            mapbox_gl_1.default.setRTLTextPlugin(setRTLTextPlugin, function (error) {
                throw error;
            }, true);
        }
        var map = new mapbox_gl_1.default.Map(__assign(__assign({}, mapboxOpts), { container: divRef.current, center: !!fitBounds
                ? [
                    (fitBounds[0][0] + fitBounds[1][0]) / 2,
                    (fitBounds[0][1] + fitBounds[1][1]) / 2
                ]
                : mapboxOpts.center }));
        !!ref && (typeof ref === 'function' ? ref(map) : (ref.current = map));
        eventRef.current = events_1.addEvents(events_1.eventsMap, props, map);
        map.on('load', function () {
            setMap(map);
        });
    }, []);
    react_1.useEffect(function () {
        if (!isMounted.current) {
            initMap();
            isMounted.current = true;
        }
    });
    react_1.useEffect(function () {
        if (isMounted.current) {
            DidUpdate();
            prevPropsRef.current = __assign({}, props);
        }
    }, [props]);
    react_1.useEffect(function () {
        return function () {
            isMounted.current = false;
            map && map.remove();
        };
    }, []);
    return (react_1.default.createElement(context_1.MapContext.Provider, { value: { map: map } },
        react_1.default.createElement("div", { className: divClass, style: __assign(__assign({}, divStyle), { width: '100%', height: '100%' }), ref: function (e) {
                divRef.current = e;
            } }, !!map && children)));
});
exports.default = Map;
