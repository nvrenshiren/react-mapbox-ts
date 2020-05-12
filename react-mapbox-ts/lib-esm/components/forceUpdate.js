import { useState } from 'react';
var useForceUpdate = function () {
    var forceUpdate = useState(0)[1];
    return function () { return forceUpdate(function (x) { return x + 1; }); };
};
export default useForceUpdate;
