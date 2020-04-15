"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
exports.MapContext = react_1.default.createContext({
    state: null
});
function reducerCallback(state, args) {
    switch (args.type) {
        case 'remove':
            return null;
        case 'load':
            return args.payload;
        default:
            return state;
    }
}
var MapContextComponent = react_1.default.memo(function (props) {
    var _a = react_1.useReducer(reducerCallback, null), state = _a[0], dispatch = _a[1];
    return (react_1.default.createElement(exports.MapContext.Provider, { value: { state: state, dispatch: dispatch } }, props.children));
});
exports.default = MapContextComponent;
