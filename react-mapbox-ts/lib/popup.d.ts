import mapboxgl, { LngLatLike } from 'mapbox-gl';
import React from 'react';
interface Props {
    positon?: LngLatLike;
    children: React.ReactNode;
    withMarker?: mapboxgl.Marker;
    hidden?: boolean;
}
declare const Popup: React.ForwardRefExoticComponent<Props & mapboxgl.PopupOptions & React.RefAttributes<mapboxgl.Popup>>;
export default Popup;
