import React from 'react';
import mapboxgl from 'mapbox-gl';
interface MapGlobalConf {
    baseapiurl?: string;
    workercount?: number;
    maxparallelimagerequests?: number;
}
declare const Map: () => React.ForwardRefExoticComponent<mapboxgl.MapboxOptions & MapGlobalConf & React.RefAttributes<mapboxgl.Map>>;
export default Map;
