/// <reference types="mapbox-gl" />
/// <reference types="react" />
declare type Props = {
    id: string;
    option: Omit<mapboxgl.RasterSource, 'type'>;
    children?: any;
};
declare const RasterSource: import("react").ForwardRefExoticComponent<Props & import("react").RefAttributes<mapboxgl.RasterSource>>;
export default RasterSource;
