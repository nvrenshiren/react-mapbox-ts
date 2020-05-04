import CanvasSource from './canvas.source';
import GeoJSONSource from './geojson.source';
import ImageSource from './image.source';
import Layer from './layer';
import Map from './map';
import Marker from './marker';
import Popup from './popup';
import RasterSource from './raster.source';
import ResterDemSource from './raster.dem.source';
import useForceUpdate from './components/forceUpdate';
import VectorSource from './vector.source';
import VideoSource from './video.source';
import { ImageRef, VideoSourcePlus, StyleImageInterface, CustomLayerData } from './types';
import { MapContext } from './components/context';
import { withMap } from './components/withmap';
import LoadImage from './load.image';
import AddImage from './add.image';
import CustomLayer from './custom.layer';
export { Map, MapContext, withMap, Marker, Popup, GeoJSONSource, Layer, useForceUpdate, VectorSource, CanvasSource, ImageSource, VideoSource, RasterSource, ResterDemSource, VideoSourcePlus, ImageRef, StyleImageInterface, CustomLayerData, CustomLayer, AddImage, LoadImage };
export default Map;
declare global {
    namespace mapboxgl {
        function prewarm(): void;
        function clearPrewarmedResources(): void;
        class MapBoxPlus extends mapboxgl.Map {
            setMinPitch: (val: number) => void;
            setMaxPitch: (val: number) => void;
            getMinPitch: () => number;
            getMaxPitch: () => number;
            updateImage: (name: string, image: ImageRef) => void;
        }
        interface GeoJSONSourceOptions {
            clusterProperties?: {
                [key: string]: any;
            };
        }
    }
}
