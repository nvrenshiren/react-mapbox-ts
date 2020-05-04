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
  tiandi: {
    name: '天地图',
    tiles: [
      '//t0.tianditu.com/DataServer?T=img_w&X={x}&Y={y}&L={z}&tk=13f2b0b67c4a2dae4b847a7bbac3e845'
    ],
    attribution: '国家基础地理信息中心',
    maxzoom: 17,
    minzoom: 5
  },
  openstreetmap: {
    name: 'OpenStreetMap',
    tiles: ['https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}.png'],
    attribution: 'OpenStreetMap'
  },
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
