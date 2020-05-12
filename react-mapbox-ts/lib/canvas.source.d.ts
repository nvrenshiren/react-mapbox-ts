/// <reference types="react" />
import { CanvasSourceRaw } from 'mapbox-gl';
declare type Props = {
    id: string;
    option: Omit<Omit<CanvasSourceRaw, 'type'>, 'canvas'>;
    children?: any;
    width?: number;
    height?: number;
};
declare type funcRefProps = {
    canvas: HTMLCanvasElement;
    source: mapboxgl.CanvasSource;
};
declare const CanvasSource: import("react").ForwardRefExoticComponent<Props & import("react").RefAttributes<funcRefProps>>;
export default CanvasSource;
