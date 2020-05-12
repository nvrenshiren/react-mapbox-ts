/// <reference types="react" />
/// <reference types="mapbox-gl" />
import { VideoSourcePlus } from './types';
declare type Props = {
    id: string;
    option: Omit<mapboxgl.VideoSourceRaw, 'type'>;
    children?: any;
};
declare const VideoSource: import("react").ForwardRefExoticComponent<Props & import("react").RefAttributes<VideoSourcePlus>>;
export default VideoSource;
