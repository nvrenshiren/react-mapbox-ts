import raw from 'raw.macro'
interface DemoItem {
  name: string
  key: string
  code: string
  des: string
}
interface DemoRoute {
  [key: string]: {
    title: string
    items: DemoItem[]
  }
}
export default {
  style: {
    title: '样式',
    items: [
      {
        name: '地图',
        key: 'map',
        code: raw('../demos/raws/demos.style.map.raw'),
        des: 'Display a map'
      },
      {
        name: '地图标注',
        key: 'marker',
        code: raw('../demos/raws/demos.style.marker.raw'),
        des: 'Add a default Marker to the map.'
      },
      {
        name: '渲染世界副本',
        key: 'worldCopies',
        code: raw('../demos/raws/demos.style.worldCopies.raw'),
        des:
          'Toggle between rendering a single world and multiple copies of the world.'
      },
      {
        name: '更改样式',
        key: 'changeStyle',
        code: raw('../demos/raws/demos.style.changeStyle.raw'),
        des: 'Switch to another map style'
      },
      {
        name: '生成图标',
        key: 'generatedIcon',
        code: raw('../demos/raws/demos.style.generatedIcon.raw'),
        des: 'Add an icon to the map that was generated at runtime.'
      }
    ]
  },
  layers: {
    title: '图层',
    items: [
      {
        name: '添加动画图标',
        key: 'animatedIcon',
        code: raw('../demos/raws/demos.style.animatedIcon.raw'),
        des:
          'Add an animated icon to the map that was generated at runtime with a Canvas.'
      },
      {
        name: '文本样式',
        key: 'textStyle',
        code: raw('../demos/raws/demos.layers.textStyle.raw'),
        des:
          'Uses the format expression to display country labels in both English and in the local language.'
      },
      {
        name: '图片渲染多边形',
        key: 'polygonPic',
        code: raw('../demos/raws/demos.layers.polygonPic.raw'),
        des:
          'Use fill-pattern to draw a polygon from a repeating image pattern.'
      },
      {
        name: 'GeoJSON点',
        key: 'pointGeoJSON',
        code: raw('../demos/raws/demos.layers.pointGeoJSON.raw'),
        des: 'Draw points from a GeoJSON collection to a map.'
      },
      {
        name: '点动画',
        key: 'pointAnimate',
        code: raw('../demos/raws/demos.layers.pointAnimate.raw'),
        des:
          'Animate the position of a point by updating a GeoJSON source on each frame.'
      },
      {
        name: '图层透明度',
        key: 'opacityLayer',
        code: raw('../demos/raws/demos.layers.opacityLayer.raw'),
        des:
          'Drag the range slider to adjust the opacity of a raster layer on top of a map.'
      },
      {
        name: 'GeoJSON线',
        key: 'lineGeoJSON',
        code: raw('../demos/raws/demos.layers.lineGeoJSON.raw'),
        des: 'Add a GeoJSON line to a map.'
      },
      {
        name: '线动画',
        key: 'lineAnimate',
        code: raw('../demos/raws/demos.layers.lineAnimate.raw'),
        des: 'Animate a line by updating a GeoJSON source on each frame.'
      },
      {
        name: '图层颜色',
        key: 'layerColor',
        code: raw('../demos/raws/demos.layers.layerColor.raw'),
        des: 'Using setPaintProperty to change a layers fill color.'
      },
      {
        name: '标签图层',
        key: 'labelsLayer',
        code: raw('../demos/raws/demos.layers.labelsLayer.raw'),
        des: 'Using the second argument of addLayer, you can be more precise.'
      },
      {
        name: '三维室内',
        key: 'indoor3D',
        code: raw('../demos/raws/demos.layers.indoor3D.raw'),
        des:
          'Create a 3D indoor map with the fill-extrude-height paint property.'
      },
      {
        name: 'Gif图片',
        key: 'gifPic',
        code: raw('../demos/raws/demos.layers.gifPic.raw'),
        des: 'Use a series of image sources to create an animation.'
      },
      {
        name: '自定义图层',
        key: 'customLayer',
        code: raw('../demos/raws/demos.layers.customLayer.raw'),
        des: 'Use a custom style layer to render custom WebGL content.'
      },
      {
        name: 'HTML标注聚合',
        key: 'clusters',
        code: raw('../demos/raws/demos.layers.clusters.raw'),
        des: 'Display HTML clusters with custom properties'
      },
      {
        name: '三维建筑',
        key: 'buildings3D',
        code: raw('../demos/raws/demos.layers.buildings3D.raw'),
        des: 'Use extrusions to display buildings height in 3D.'
      },
      {
        name: '大数据渲染',
        key: 'bigDataCircles',
        code: raw('../demos/raws/demos.layers.bigDataCircles.raw'),
        des: 'Creating a visualization with a data expression for circle-color.'
      },
      {
        name: 'GeoJSON多边形',
        key: 'polygonGeoJSON',
        code: raw('../demos/raws/demos.layers.polygonGeoJSON.raw'),
        des: 'Style a polygon with the fill layer type.'
      },
      {
        name: '地形阴影',
        key: 'hillshading',
        code: raw('../demos/raws/demos.layers.hillshading.raw'),
        des: 'Adds raster hillshading to a map.'
      },
      {
        name: '渐变线',
        key: 'gradientLine',
        code: raw('../demos/raws/demos.layers.gradientLine.raw'),
        des:
          'Use the line-gradient paint property and an expression to visualize distance from the starting point of a line.'
      }
    ]
  }
} as DemoRoute
