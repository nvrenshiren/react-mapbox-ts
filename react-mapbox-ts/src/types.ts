import { CustomLayerInterface } from 'mapbox-gl'

export interface VideoSourcePlus extends mapboxgl.VideoSource {
  video?: HTMLVideoElement
  pause?: Function
  play?: Function
  onAdd?: Function
  load?: Function
  prepare?: Function
  seek?: Function
}

export type ImageRef =
  | HTMLImageElement
  | ArrayBufferView
  | {
      width: number
      height: number
      data: Uint8Array | Uint8ClampedArray
    }
  | ImageData
  | StyleImageInterface

export interface StyleImageInterface {
  width: number
  height: number
  data: Uint8Array | Uint8ClampedArray
  map?: mapboxgl.MapBoxPlus
  onAdd?(map: mapboxgl.MapBoxPlus): void
  onRemove?(): void
  render?(): boolean
}

export interface CustomLayerData extends CustomLayerInterface {
  map?: mapboxgl.Map
  [key: string]: any
}
declare global {
  namespace mapboxgl {
    export function prewarm(): void
    export function clearPrewarmedResources(): void
    class MapBoxPlus extends mapboxgl.Map {
      setMinPitch: (val: number) => void
      setMaxPitch: (val: number) => void
      getMinPitch: () => number
      getMaxPitch: () => number
      updateImage: (name: string, image: ImageRef) => void
    }
  }
}
