interface wmsItem {
  [key: string]: {
    name?: string
    tiles?: string[]
    bounds?: number[]
    minzoom?: number
    maxzoom?: number
    tileSize?: number
    scheme?: 'xyz' | 'tms'
    attribution?: string
  }
}

export default {
  fastly: {
    name: 'Fastly',
    tiles: ['https://stamen-tiles.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.jpg'],
    attribution: 'fastly.net'
  },
  gaode: {
    name: '高德',
    tiles: [
      '//webrd01.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}'
    ],
    attribution: '高德',
    maxzoom: 18,
    minzoom: 2
  },
  google: {
    name: '谷歌',
    tiles: ['//www.google.cn/maps/vt?lyrs=m@189&gl=cn&x={x}&y={y}&z={z}'],
    attribution: '谷歌'
  },
  geoq: {
    name: 'Geoq',
    tiles: [
      '//map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetGray/MapServer/tile/{z}/{y}/{x}'
    ],
    attribution: 'Geoq'
  },
  osm: {
    name: 'OSM',
    tiles: ['//c.tile.osm.org/{z}/{x}/{y}.png'],
    attribution: 'OSM'
  }
} as wmsItem
