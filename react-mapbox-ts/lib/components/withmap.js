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
var context_1 = require("./context");
var react_1 = __importDefault(require("react"));
function withMap(Component) {
    return function (props) {
        return (react_1.default.createElement(context_1.MapContext.Consumer, null, function (MapState) { return react_1.default.createElement(Component, __assign({ map: MapState.map }, props)); }));
    };
}
exports.withMap = withMap;
var WithContent = function (props) {
    return (react_1.default.createElement(context_1.MapContext.Provider, { value: { map: props.map } }, props.children));
};
exports.default = WithContent;
