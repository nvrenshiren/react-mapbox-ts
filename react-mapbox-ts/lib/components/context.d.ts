/// <reference types="mapbox-gl" />
import React, { PropsWithChildren } from 'react';
export declare type MapAction = 'remove' | 'load';
export declare type MapState = mapboxgl.Map | null;
export interface MapDispatchArgs {
    type: MapAction;
    payload: MapState;
}
export interface MapContextAction {
    state: MapState;
    dispatch?: (args: MapDispatchArgs) => void;
}
export declare const MapContext: React.Context<MapContextAction>;
declare const MapContextComponent: React.NamedExoticComponent<PropsWithChildren<{}>>;
export default MapContextComponent;
