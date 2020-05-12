/// <reference types="mapbox-gl" />
/// <reference types="react" />
declare type Props = {
    id: string;
    option: Omit<mapboxgl.VectorSource, 'type'>;
    children?: any;
};
declare const VectorSource: import("react").ForwardRefExoticComponent<Props & import("react").RefAttributes<mapboxgl.VectorSource>>;
export default VectorSource;
