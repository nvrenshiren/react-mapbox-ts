import mapboxConf from '@/assets/mapbox.conf'
import mapboxgl from 'mapbox-gl'
import React, { useCallback, useRef, useState } from 'react'
import { GeoJSONSource, Layer, Map, Marker } from 'react-mapbox-ts'

const Demo: React.FC = () => {
  const mapRef = useRef<mapboxgl.MapBoxPlus>()
  const mag1 = ['<', ['get', 'mag'], 2]
  const mag2 = ['all', ['>=', ['get', 'mag'], 2], ['<', ['get', 'mag'], 3]]
  const mag3 = ['all', ['>=', ['get', 'mag'], 3], ['<', ['get', 'mag'], 4]]
  const mag4 = ['all', ['>=', ['get', 'mag'], 4], ['<', ['get', 'mag'], 5]]
  const mag5 = ['>=', ['get', 'mag'], 5]
  const colors = ['#fed976', '#feb24c', '#fd8d3c', '#fc4e2a', '#e31a1c']

  let markers = useRef({}).current
  let [markersOnScreen, setMarkersOnScreen] = useState({})

  const updateMarkers = useCallback(() => {
    {
      let newMarkers = {}
      let features = mapRef.current.querySourceFeatures('earthquakes')
      for (let i = 0; i < features.length; i++) {
        let coords = features[i].geometry['coordinates']
        let props = features[i].properties
        if (!props.cluster) continue
        let id = props.cluster_id
        let marker = markers[id]
        if (!marker) {
          let el = createDonutChart(props)
          marker = markers[id] = {
            positon: coords,
            children: el
          }
        }
        newMarkers[id] = marker
      }

      setMarkersOnScreen(newMarkers)
    }
  }, [])
  const createDonutChart = useCallback((props) => {
    {
      let offsets = []
      let counts = [props.mag1, props.mag2, props.mag3, props.mag4, props.mag5]
      let total = 0
      for (let i = 0; i < counts.length; i++) {
        offsets.push(total)
        total += counts[i]
      }
      let fontSize =
        total >= 1000 ? 22 : total >= 100 ? 20 : total >= 10 ? 18 : 16
      let r = total >= 1000 ? 50 : total >= 100 ? 32 : total >= 10 ? 24 : 18
      let r0 = Math.round(r * 0.6)
      let w = r * 2
      let html =
        '<svg width="' +
        w +
        '" height="' +
        w +
        '" viewbox="0 0 ' +
        w +
        ' ' +
        w +
        '" text-anchor="middle" style="font: ' +
        fontSize +
        'px sans-serif">'

      for (let i = 0; i < counts.length; i++) {
        html += donutSegment(
          offsets[i] / total,
          (offsets[i] + counts[i]) / total,
          r,
          r0,
          colors[i]
        )
      }
      html +=
        '<circle cx="' +
        r +
        '" cy="' +
        r +
        '" r="' +
        r0 +
        '" fill="white" /><text dominant-baseline="central" transform="translate(' +
        r +
        ', ' +
        r +
        ')">' +
        total.toLocaleString() +
        '</text></svg>'
      return html
    }
  }, [])

  const donutSegment = useCallback((start, end, r, r0, color) => {
    if (end - start === 1) end -= 0.00001
    let a0 = 2 * Math.PI * (start - 0.25)
    let a1 = 2 * Math.PI * (end - 0.25)
    let x0 = Math.cos(a0),
      y0 = Math.sin(a0)
    let x1 = Math.cos(a1),
      y1 = Math.sin(a1)
    let largeArc = end - start > 0.5 ? 1 : 0
    return [
      '<path d="M',
      r + r0 * x0,
      r + r0 * y0,
      'L',
      r + r * x0,
      r + r * y0,
      'A',
      r,
      r,
      0,
      largeArc,
      1,
      r + r * x1,
      r + r * y1,
      'L',
      r + r0 * x1,
      r + r0 * y1,
      'A',
      r0,
      r0,
      0,
      largeArc,
      0,
      r + r0 * x0,
      r + r0 * y0,
      '" fill="' + color + '" />'
    ].join(' ')
  }, [])

  return (
    <Map
      // ref={mapRef}
      ref={(map) => {
        window.map = map
        mapRef.current = map
      }}
      accessToken={mapboxConf.accessToken}
      style="mapbox://styles/mapbox/dark-v9"
      zoom={2}
      center={[0, 0]}
      onData={updateMarkers}
      onMove={updateMarkers}
      onMoveEnd={updateMarkers}
    >
      {Object.keys(markersOnScreen).map((key) => {
        return (
          <Marker key={key} positon={markersOnScreen[key].positon}>
            <div
              dangerouslySetInnerHTML={{
                __html: markersOnScreen[key].children
              }}
            />
          </Marker>
        )
      })}
      <GeoJSONSource
        id="earthquakes"
        option={{
          data:
            'https://docs.mapbox.com/mapbox-gl-js/assets/earthquakes.geojson',
          cluster: true,
          clusterRadius: 80,
          clusterProperties: {
            mag1: ['+', ['case', mag1, 1, 0]],
            mag2: ['+', ['case', mag2, 1, 0]],
            mag3: ['+', ['case', mag3, 1, 0]],
            mag4: ['+', ['case', mag4, 1, 0]],
            mag5: ['+', ['case', mag5, 1, 0]]
          }
        }}
      >
        <Layer
          id="earthquake_circle"
          source="earthquakes"
          type="circle"
          paint={{
            'circle-color': [
              'case',
              mag1,
              colors[0],
              mag2,
              colors[1],
              mag3,
              colors[2],
              mag4,
              colors[3],
              colors[4]
            ],
            'circle-opacity': 0.6,
            'circle-radius': 12
          }}
          filter={['!=', 'cluster', true]}
        />
        <Layer
          id="earthquake_label"
          type="symbol"
          source="earthquakes"
          filter={['!=', 'cluster', true]}
          layout={{
            'text-field': [
              'number-format',
              ['get', 'mag'],
              { 'min-fraction-digits': 1, 'max-fraction-digits': 1 }
            ],
            'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
            'text-size': 10
          }}
          paint={{
            'text-color': ['case', ['<', ['get', 'mag'], 3], 'black', 'white']
          }}
        />
      </GeoJSONSource>
    </Map>
  )
}
export default Demo
