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
import equal from 'fast-deep-equal';
import { forwardRef, useCallback, useContext, useEffect, useMemo, useRef } from 'react';
import { MapContext, useForceUpdate } from '.';
var AddImage = forwardRef(function (props, ref) {
    var isMounted = useRef(false);
    var forceUpdate = useForceUpdate();
    var map = useContext(MapContext).map;
    var prevPropsRef = useRef(__assign({}, props));
    var currentPropsRef = useRef(__assign({}, props));
    currentPropsRef.current = props;
    var imgRef = useRef();
    var children = props.children, name = props.name;
    var imageName = useMemo(function () { return name; }, []);
    var DidUpdate = useCallback(function () {
        var currentProps = currentPropsRef.current;
        var prevProps = prevPropsRef.current;
        var image = currentProps.image;
        if (!equal(image, prevProps.image)) {
            map === null || map === void 0 ? void 0 : map.updateImage(imageName, image);
        }
    }, []);
    var removeImage = useCallback(function () {
        if (map && map.hasImage('imageName')) {
            map.removeImage(imageName);
        }
    }, []);
    var getImage = useCallback(function () {
        var currentProps = currentPropsRef.current;
        var image = currentProps.image, options = currentProps.options;
        map === null || map === void 0 ? void 0 : map.addImage(imageName, image, options);
        imgRef.current = image;
        forceUpdate();
    }, []);
    var reRender = useCallback(function () {
        if (!(map === null || map === void 0 ? void 0 : map.hasImage(imageName))) {
            imgRef.current = undefined;
            getImage();
        }
    }, []);
    var willMount = useCallback(function () {
        map === null || map === void 0 ? void 0 : map.on('style.load', reRender);
    }, []);
    useEffect(function () {
        if (!isMounted.current) {
            willMount();
            getImage();
            isMounted.current = true;
        }
        else {
            DidUpdate();
            prevPropsRef.current = __assign({}, props);
        }
    });
    useEffect(function () {
        return function () {
            removeImage();
            map === null || map === void 0 ? void 0 : map.off('style.load', reRender);
        };
    }, []);
    return !!imgRef.current && !!children ? children : null;
});
export default AddImage;
