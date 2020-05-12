/// <reference types="mapbox-gl" />
/// <reference types="react" />
declare type Props = {
    id: string;
    option: Omit<mapboxgl.RasterDemSource, 'type'>;
    children?: any;
};
declare const RasterDemSource: import("react").ForwardRefExoticComponent<Props & import("react").RefAttributes<mapboxgl.RasterDemSource>>;
export default RasterDemSource;
