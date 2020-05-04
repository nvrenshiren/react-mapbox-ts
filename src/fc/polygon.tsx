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

const FCPolygon: React.FC = () => {
  const { map } = useContext(MapContext)
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
  const onMouseLeave = useCallback((e: mapboxgl.MapLayerMouseEvent) => {
    if (hoverItem) {
      map.setFeatureState(
        { source: 'Polygon', id: hoverItem },
        { hover: false }
      )
    }
    hoverItem = null
  }, [])
  const onMouseMove = useCallback((e: mapboxgl.MapLayerMouseEvent) => {
    if (e.features.length > 0 && e.features[0].id !== clickItem) {
      if (!!hoverItem) {
        map.setFeatureState(
          { source: 'Polygon', id: hoverItem },
          { hover: false }
        )
      }

      hoverItem = e.features[0].id
      map.setFeatureState({ source: 'Polygon', id: hoverItem }, { hover: true })
    }
  }, [])
  const onClick = useCallback((e: mapboxgl.MapLayerMouseEvent) => {
    if (e.features.length > 0) {
      if (!!clickItem) {
        map.setFeatureState(
          { source: 'Polygon', id: clickItem },
          { status: false }
        )
      }
      clickItem = e.features[0].id
      map.setFeatureState(
        { source: 'Polygon', id: hoverItem },
        { status: true }
      )

      map.flyTo({
        center: JSON.parse(e.features[0].properties.center),
        zoom: 13,
        pitch: 60
      })
      map.dragPan.enable()
      map.dragRotate.enable()
      map.scrollZoom.enable()
    }
  }, [])
  const zoomChange = useCallback(() => {
    if (map.getZoom() < 10) {
      map.flyTo({
        center: [115.805, 28.079],
        zoom: 9,
        pitch: 0,
        bearing: 0
      })
      map.dragPan.disable()
      map.dragRotate.disable()
      map.scrollZoom.disable()
    }
  }, [])
  useEffect(() => {
    map.on('zoomend', () => {
      zoomChange()
    })
  }, [])
  return (
    <>
      <GeoJSONSource
        id="Polygon"
        option={{
          data: polygonData
        }}
      >
        <Layer
          id="area"
          source="Polygon"
          type="fill"
          paint={{
            'fill-color': '#bbaa41',
            'fill-opacity': [
              'case',
              ['boolean', ['feature-state', 'hover'], false],
              0.8,
              0
            ]
          }}
          onClick={onClick}
          onMouseLeave={onMouseLeave}
          onMouseMove={onMouseMove}
        />
        <Layer
          id="area-border"
          source="Polygon"
          type="line"
          paint={{
            'line-color': [
              'case',
              ['boolean', ['feature-state', 'status'], false],
              '#c9ad00',
              '#fff'
            ],
            'line-width': [
              'interpolate',
              ['exponential', 0.5],
              ['zoom'],
              9,
              1,
              13,
              5
            ]
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
              'icon-size': 1
            }}
            paint={{
              'icon-opacity': [
                'interpolate',
                ['exponential', 0.5],
                ['zoom'],
                9,
                1,
                10,
                0
              ]
            }}
            before="area"
          />
        </GeoJSONSource>
      </LoadImage>
    </>
  )
}

export default FCPolygon
