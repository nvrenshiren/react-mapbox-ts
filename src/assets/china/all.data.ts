export default {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: {
        name: '全球'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [
              [180, -85],
              [-180, -85],
              [-180, 85],
              [180, 85]
            ]
          ]
        ]
      }
    }
  ]
}
