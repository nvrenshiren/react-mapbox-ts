"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var context_1 = __importDefault(require("./components/context"));
var Map = function () {
    return react_1.default.forwardRef(function (props, ref) {
        return (react_1.default.createElement(context_1.default, null,
            react_1.default.createElement("div", null)));
    });
};
exports.default = Map;
