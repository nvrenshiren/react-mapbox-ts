"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MapContext = void 0;
var react_1 = __importDefault(require("react"));
exports.MapContext = react_1.default.createContext({
    map: null
});
