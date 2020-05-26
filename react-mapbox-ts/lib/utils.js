"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDiffData = exports.diffLngLat = void 0;
function diffLngLat(prev, current) {
    return !current || !prev || prev === current
        ? false
        : Array.isArray(current)
            ? (current && current[0]) !== prev.lng ||
                (current && current[1]) !== prev.lat
            : 'lon' in current
                ? (current === null || current === void 0 ? void 0 : current.lon) !== prev.lng || current.lat !== prev.lat
                : (current === null || current === void 0 ? void 0 : current.lat) !== prev.lng || current.lat !== prev.lat;
}
exports.diffLngLat = diffLngLat;
function getDiffData(source, target) {
    var result = {};
    Array.from(new Set(__spreadArrays(Object.keys(source), Object.keys(target)))).forEach(function (key) {
        if (source[key] !== target[key]) {
            result[key] = target[key];
        }
    });
    return result;
}
exports.getDiffData = getDiffData;
