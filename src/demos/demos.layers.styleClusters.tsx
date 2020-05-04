import mapboxConf from '@/assets/mapbox.conf'
import mapboxgl, { LngLatLike } from 'mapbox-gl'
import React, { useCallback, useRef, useState } from 'react'
import { GeoJSONSource, Layer, Map, Popup } from 'react-mapbox-ts'

const Demo: React.FC = () => {
  const mapRef = useRef<mapboxgl.MapBoxPlus>()
  const sourceRef = useRef<mapboxgl.GeoJSONSource>()
  const [popConf, setPopConf] = useState({
    positon: [0, 0] as LngLatLike,
    children: null,
    hidden: true
  })
  const clustersOnClick = useCallback((e) => {
    var features = mapRef.current.queryRenderedFeatures(e.point, {
      layers: ['clusters']
    })
    var clusterId = features[0].properties.cluster_id
    sourceRef.current.getClusterExpansionZoom(clusterId, (err, zoom) => {
      if (err) return
      mapRef.current.easeTo({
        center: features[0].geometry['coordinates'],
        zoom: zoom
      })
    })
  }, [])

  const unclusteredOnClick = useCallback((e) => {
    let coordinates = e.features[0].geometry.coordinates.slice()
    let mag = e.features[0].properties.mag
    let tsunami
    if (e.features[0].properties.tsunami === 1) {
      tsunami = 'yes'
    } else {
      tsunami = 'no'
    }
    while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
      coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360
    }
    setPopConf({
      positon: coordinates,
      children: 'magnitude: ' + mag + '<br>Was there a tsunami?: ' + tsunami,
      hidden: false
    })
  }, [])

  return (
    <Map
      // ref={mapRef}
      ref={(map) => {
        window.map = map
        mapRef.current = map
      }}
      accessToken={mapboxConf.accessToken}
      style="mapbox://styles/mapbox/dark-v10"
      zoom={3}
      center={[-103.59179687498357, 40.66995747013945]}
    >
      <Popup
        positon={popConf.positon}
        hidden={popConf.hidden}
        closeButton={false}
        closeOnMove={true}
      >
        <div dangerouslySetInnerHTML={{ __html: popConf.children }} />
      </Popup>
      <GeoJSONSource
        ref={sourceRef}
        id="earthquakes"
        option={{
          data:
            'https://docs.mapbox.com/mapbox-gl-js/assets/earthquakes.geojson',
          cluster: true,
          clusterRadius: 50,
          clusterMaxZoom: 14
        }}
      >
        <Layer
          id="clusters"
          source="earthquakes"
          type="circle"
          paint={{
            'circle-color': [
              'step',
              ['get', 'point_count'],
              '#51bbd6',
              100,
              '#f1f075',
              750,
              '#f28cb1'
            ],
            'circle-radius': [
              'step',
              ['get', 'point_count'],
              20,
              100,
              30,
              750,
              40
            ]
          }}
          filter={['has', 'point_count']}
          onClick={clustersOnClick}
        />
        <Layer
          id="cluster-count"
          type="symbol"
          source="earthquakes"
          filter={['has', 'point_count']}
          layout={{
            'text-field': '{point_count_abbreviated}',
            'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
            'text-size': 12
          }}
        />
        <Layer
          id="unclustered-point"
          type="circle"
          source="earthquakes"
          filter={['!', ['has', 'point_count']]}
          paint={{
            'circle-color': '#11b4da',
            'circle-radius': 4,
            'circle-stroke-width': 1,
            'circle-stroke-color': '#fff'
          }}
          onClick={unclusteredOnClick}
        />
      </GeoJSONSource>
    </Map>
  )
}
export default Demo
