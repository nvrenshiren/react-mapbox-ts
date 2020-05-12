/// <reference types="mapbox-gl" />
/// <reference types="react" />
import { MapLayerEventList } from './events';
declare type zIndex = {
    before?: string;
    sourceLayer?: string;
};
declare type Props = mapboxgl.Layer & Partial<MapLayerEventList> & zIndex;
declare const Layer: import("react").ForwardRefExoticComponent<Pick<Props, "interactive" | "source" | "filter" | "metadata" | "layout" | "paint" | "type" | "id" | "maxzoom" | "onTouchCancel" | "onTouchEnd" | "onTouchStart" | "onClick" | "onContextMenu" | "onDblClick" | "onMouseMove" | "onMouseUp" | "onMouseDown" | "onMouseOut" | "onMouseOver" | "onMouseEnter" | "onMouseLeave" | "source-layer" | "minzoom" | "before" | "sourceLayer"> & import("react").RefAttributes<mapboxgl.Layer>>;
export default Layer;
