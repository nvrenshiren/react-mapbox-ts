"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var useForceUpdate = function () {
    var forceUpdate = react_1.useState(0)[1];
    return function () { return forceUpdate(function (x) { return x + 1; }); };
};
exports.default = useForceUpdate;
