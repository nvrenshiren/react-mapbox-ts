/// <reference types="mapbox-gl" />
/// <reference types="react" />
declare type Props = {
    id: string;
    option: Omit<mapboxgl.ImageSourceRaw, 'type'>;
    children?: any;
};
declare const ImageSource: import("react").ForwardRefExoticComponent<Props & import("react").RefAttributes<mapboxgl.ImageSource>>;
export default ImageSource;
