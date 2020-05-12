/// <reference types="mapbox-gl" />
/// <reference types="react" />
import { CustomLayerData } from '.';
import { MapLayerEventList } from './events';
declare type zIndex = {
    before?: string;
};
interface Props extends Partial<MapLayerEventList>, zIndex {
    data: CustomLayerData;
}
declare const CustomLayer: import("react").ForwardRefExoticComponent<Props & import("react").RefAttributes<mapboxgl.Layer>>;
export default CustomLayer;
