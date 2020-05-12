import React from 'react';
import { MapBoxPlus } from 'mapbox-gl';
export interface MapContextAction {
    map: MapBoxPlus | null;
}
export declare const MapContext: React.Context<MapContextAction>;
