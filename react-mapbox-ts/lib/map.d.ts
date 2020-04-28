import mapboxgl, { AnimationOptions, FlyToOptions } from 'mapbox-gl';
import React from 'react';
import { MapEventList } from './events';
interface MapGlobalConf {
    baseapiurl?: string;
    workercount?: number;
    maxparallelimagerequests?: number;
    setRTLTextPlugin?: string;
}
interface MapDivConf {
    divStyle?: React.CSSProperties;
    divClass?: string;
    injectCSS?: boolean;
    children?: React.ReactNode;
}
interface MapDiyConf {
    movingMethod?: 'jumpTo' | 'easeTo' | 'flyTo';
    fitBounds?: [[number, number], [number, number]];
    animationOptions?: Partial<AnimationOptions>;
    flyToOptions?: Partial<FlyToOptions>;
}
declare const Map: React.ForwardRefExoticComponent<Partial<Pick<mapboxgl.MapboxOptions, "interactive" | "center" | "style" | "zoom" | "bearing" | "pitch" | "antialias" | "attributionControl" | "bearingSnap" | "bounds" | "boxZoom" | "clickTolerance" | "collectResourceTiming" | "crossSourceCollisions" | "customAttribution" | "dragPan" | "dragRotate" | "doubleClickZoom" | "hash" | "fadeDuration" | "failIfMajorPerformanceCaveat" | "fitBoundsOptions" | "keyboard" | "locale" | "localIdeographFontFamily" | "logoPosition" | "maxBounds" | "maxPitch" | "maxZoom" | "minPitch" | "minZoom" | "preserveDrawingBuffer" | "pitchWithRotate" | "refreshExpiredTiles" | "renderWorldCopies" | "scrollZoom" | "trackResize" | "transformRequest" | "touchZoomRotate" | "maxTileCacheSize" | "accessToken">> & MapGlobalConf & MapDivConf & MapDiyConf & Partial<MapEventList> & React.RefAttributes<mapboxgl.Map>>;
export default Map;
