import React, {
  useMemo,
  useCallback,
  useRef,
  useContext,
  useEffect,
  useState
} from 'react'
import { GeoJSONSource, Layer, MapContext, LoadImage } from 'react-mapbox-ts'
import fcBounds from '@/assets/fc/fc.bounds'
import allData from '@/assets/china/all.data'
import fcData from '@/assets/china/fc.data'

const FCPolygon: React.FC = () => {
  const { map } = useContext(MapContext)
  const [lineData, setLineData] = useState([])
  const polygonData: any = useMemo(() => {
    const FeatureCollection = {
      type: 'FeatureCollection',
      features: [] as any
    }
    fcBounds.districtList.forEach((item, index) => {
      let data = {
        type: 'Feature',
        properties: {},
        geometry: { type: 'Polygon', coordinates: [] as any },
        id: index + 1
      }
      const { name, center, boundaries } = item
      data.properties = { name, center }
      data.geometry.coordinates = [boundaries]
      FeatureCollection.features.push(data)
    })
    return FeatureCollection
  }, [])

  let hoverItem = useRef<any>().current
  let clickItem = useRef<any>().current
  let prevZoom = useRef<number>(map.getZoom()).current
  let zoomType = useRef<string>().current
  let isDo = useRef(false).current
  const onMouseLeave = useCallback((e: mapboxgl.MapLayerMouseEvent) => {
    if (hoverItem !== null) {
      map.setFeatureState(
        { source: `polygon`, id: hoverItem },
        { hover: false }
      )
    }
    hoverItem = null
  }, [])
  const onMouseMove = useCallback((e: mapboxgl.MapLayerMouseEvent) => {
    if (e.features.length > 0 && e.features[0].id !== clickItem) {
      if (!!hoverItem) {
        map.setFeatureState(
          { source: `polygon`, id: hoverItem },
          { hover: false }
        )
      }
      hoverItem = e.features[0].id
      map.setFeatureState({ source: `polygon`, id: hoverItem }, { hover: true })
    }
  }, [])
  const onClick = useCallback((e: mapboxgl.MapLayerMouseEvent) => {
    if (e.features.length > 0) {
      clickItem = e.features[0].id
      const district = fcBounds.districtList.find(
        (item) => item.name === e.features[0].properties.name
      )
      setLineData(district.boundaries)
      map.flyTo({
        center: JSON.parse(e.features[0].properties.center),
        zoom: 14,
        pitch: 60
      })
    }
  }, [])
  useEffect(() => {
    map.on('zoomend', () => {
      if (map.getZoom() < 10) {
        if (zoomType === 'small' && !isDo) {
          isDo = true
          clickItem = null
          setLineData([])
          map.easeTo({
            zoom: 9,
            pitch: 0,
            bearing: 0,
            center: [115.787221, 28.085669]
          })
        }
      }
    })
    map.on('zoom', () => {
      if (prevZoom > map.getZoom()) {
        zoomType = 'small'
      } else {
        isDo = false
        zoomType = 'big'
      }
      prevZoom = map.getZoom()
    })
  }, [])
  return (
    <>
      <GeoJSONSource
        id="polygon-mark"
        option={{
          data: {
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'MultiPolygon',
              coordinates: [
                [
                  allData.features[0].geometry.coordinates[0][0],
                  fcData.features[0].geometry.coordinates[0][0]
                ]
              ]
            }
          }
        }}
      >
        <Layer
          id="polygon-mark-item"
          source="polygon-mark"
          type="fill"
          paint={{
            'fill-color': '#000',
            'fill-opacity': [
              'interpolate',
              ['exponential', 0.2],
              ['zoom'],
              9,
              0,
              10,
              0.6
            ],
            'fill-outline-color': 'rgba(0,0,0,0)',
            'fill-translate': [-5, -5]
          }}
          before="area-box"
        />
      </GeoJSONSource>
      {!!lineData.length && (
        <GeoJSONSource
          id="high-line-data"
          option={{
            data: {
              type: 'Feature',
              properties: {},
              geometry: {
                type: 'LineString',
                coordinates: lineData
              }
            },
            lineMetrics: true
          }}
        >
          <Layer
            id="high-line"
            source="high-line-data"
            type="line"
            paint={{
              'line-color': '#c9ad00',
              'line-width': 5
            }}
            layout={{
              'line-cap': 'round',
              'line-join': 'round'
            }}
          />
        </GeoJSONSource>
      )}
      <GeoJSONSource
        id="polygon"
        option={{
          data: polygonData
        }}
      >
        <Layer
          id="area-box"
          source="polygon"
          type="fill"
          paint={{
            'fill-color': '#bbaa41',
            'fill-opacity': [
              'case',
              ['boolean', ['feature-state', 'hover'], false],
              0.8,
              0
            ],
            'fill-outline-color': '#fff'
          }}
          onClick={onClick}
          onMouseLeave={onMouseLeave}
          onMouseMove={onMouseMove}
        />
        <Layer
          id="area-line"
          source="polygon"
          type="line"
          paint={{
            'line-color': '#fff'
          }}
        />
      </GeoJSONSource>
      <LoadImage name="png2d" url={require('@/assets/fc/2d.png')}>
        <GeoJSONSource
          id="png2d-positon"
          option={{
            data: {
              type: 'FeatureCollection',
              features: [
                {
                  type: 'Feature',
                  geometry: {
                    type: 'Point',
                    coordinates: [115.805, 28.079]
                  }
                }
              ]
            }
          }}
        >
          <Layer
            id="png2d-img"
            type="symbol"
            source="png2d-positon"
            layout={{
              'icon-image': 'png2d',
              'icon-size': 1,
              'icon-pitch-alignment': 'map',
              'icon-rotation-alignment': 'map'
            }}
            paint={{
              'icon-opacity': [
                'interpolate',
                ['exponential', 0.2],
                ['zoom'],
                9,
                1,
                10,
                0
              ]
            }}
            before="area-box"
          />
        </GeoJSONSource>
      </LoadImage>
    </>
  )
}

export default FCPolygon
