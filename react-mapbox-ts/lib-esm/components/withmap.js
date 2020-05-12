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
import React from 'react';
import { MapContext } from './context';
export function withMap(Component) {
    return function (props) {
        return (React.createElement(MapContext.Consumer, null, function (MapState) { return React.createElement(Component, __assign({ map: MapState.map }, props)); }));
    };
}
