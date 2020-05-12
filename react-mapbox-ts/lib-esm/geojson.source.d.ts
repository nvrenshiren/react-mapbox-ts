/// <reference types="react" />
import { GeoJSONSourceRaw } from 'mapbox-gl';
declare type Props = {
    id: string;
    option: Omit<GeoJSONSourceRaw, 'type'>;
    children?: any;
};
declare const GeoJSONSource: import("react").ForwardRefExoticComponent<Props & import("react").RefAttributes<mapboxgl.GeoJSONSource>>;
export default GeoJSONSource;
