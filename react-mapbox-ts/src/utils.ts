import { LngLatLike } from 'mapbox-gl'

export function diffLngLat(prev: mapboxgl.LngLat, current?: LngLatLike) {
  return !current || prev === current
    ? false
    : Array.isArray(current)
    ? (current && current[0]) !== prev.lng ||
      (current && current[1]) !== prev.lat
    : 'lon' in current
    ? current?.lon !== prev.lng || current.lat !== prev.lat
    : current?.lat !== prev.lng || current.lat !== prev.lat
}
