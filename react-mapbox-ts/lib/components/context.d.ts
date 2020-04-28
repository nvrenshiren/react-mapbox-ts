/// <reference types="mapbox-gl" />
import React from 'react';
export interface MapContextAction {
    map: mapboxgl.Map | null;
}
export declare const MapContext: React.Context<MapContextAction>;
