"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function diffLngLat(prev, current) {
    return !current || prev === current
        ? false
        : Array.isArray(current)
            ? (current && current[0]) !== prev.lng ||
                (current && current[1]) !== prev.lat
            : 'lon' in current
                ? (current === null || current === void 0 ? void 0 : current.lon) !== prev.lng || current.lat !== prev.lat
                : (current === null || current === void 0 ? void 0 : current.lat) !== prev.lng || current.lat !== prev.lat;
}
exports.diffLngLat = diffLngLat;
