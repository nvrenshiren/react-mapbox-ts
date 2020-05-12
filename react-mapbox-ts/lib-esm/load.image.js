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
import React, { forwardRef, useCallback, useContext, useEffect, useMemo, useRef } from 'react';
import { MapContext, useForceUpdate } from '.';
import AddImage from './add.image';
var LoadImage = forwardRef(function (props, ref) {
    var isMounted = useRef(false);
    var forceUpdate = useForceUpdate();
    var map = useContext(MapContext).map;
    var prevPropsRef = useRef(__assign({}, props));
    var currentPropsRef = useRef(__assign({}, props));
    currentPropsRef.current = props;
    var imgRef = useRef();
    var name = props.name, options = props.options, children = props.children;
    var imageName = useMemo(function () { return name; }, []);
    var DidUpdate = useCallback(function () {
        var currentProps = currentPropsRef.current;
        var prevProps = prevPropsRef.current;
        var url = currentProps.url;
        if (!equal(url, prevProps.url)) {
            getImage();
        }
    }, []);
    var removeImage = useCallback(function () {
        if (map && map.hasImage(imageName)) {
            map.removeImage(imageName);
        }
    }, []);
    var getImage = useCallback(function () {
        var currentProps = currentPropsRef.current;
        var url = currentProps.url;
        map === null || map === void 0 ? void 0 : map.loadImage(url, function (error, image) {
            if (error) {
                throw error;
            }
            else {
                imgRef.current = image;
                forceUpdate();
            }
        });
    }, []);
    useEffect(function () {
        if (!isMounted.current) {
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
        };
    }, []);
    return !!imgRef.current ? (React.createElement(AddImage, { name: imageName, ref: ref, image: imgRef.current, options: options }, children)) : null;
});
export default LoadImage;
