import mapboxgl, { LngLatLike } from 'mapbox-gl';
import React from 'react';
import { MarkerEventList } from './events';
interface Props extends Omit<mapboxgl.MarkerOptions, 'element'>, Partial<MarkerEventList> {
    positon: LngLatLike;
    popup?: React.ReactNode;
    popupOption?: mapboxgl.PopupOptions;
    children?: React.ReactNode;
}
declare const Marker: React.ForwardRefExoticComponent<Props & React.RefAttributes<mapboxgl.Marker>>;
export default Marker;
