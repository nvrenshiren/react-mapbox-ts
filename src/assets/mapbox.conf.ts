export default {
  accessToken:
    'pk.eyJ1IjoiMTg2MjcwMjE1NDMiLCJhIjoiY2s4dHh3dnJ6MDBlMDNmb2l2bDQ4aDF1YSJ9.f6-80XxhwYLNJRDdntMF2w',
  style: 'mapbox://styles/mapbox/streets-v11',
  center: {
    lon: 114.305215,
    lat: 30.592935
  },
  zoom: 10,
  tiles: {
    tiandi: {
      url:
        'http://t0.tianditu.gov.cn/img_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=img&tileMatrixSet=w&TileMatrix={z}&TileRow={y}&TileCol={x}&style=default&format=tiles&tk=13f2b0b67c4a2dae4b847a7bbac3e845'
    }
  }
}
