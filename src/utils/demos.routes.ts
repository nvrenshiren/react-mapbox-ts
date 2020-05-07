import raw from 'raw.macro'
interface DemoItem {
  name: string
  key: string
  code: string
  des: string
  sanbox?: string
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
        des: 'Display a map',
        sanbox: 'https://codesandbox.io/s/ditu-tm8y0'
      },
      {
        name: '地图标注',
        key: 'marker',
        code: raw('../demos/raws/demos.style.marker.raw'),
        des: 'Add a default Marker to the map.',
        sanbox: 'https://codesandbox.io/s/ditubiaozhu-vm01w'
      },
      {
        name: '渲染世界副本',
        key: 'worldCopies',
        code: raw('../demos/raws/demos.style.worldCopies.raw'),
        des:
          'Toggle between rendering a single world and multiple copies of the world.',
        sanbox: 'https://codesandbox.io/s/ditufuben-d9olj'
      },
      {
        name: '更改样式',
        key: 'changeStyle',
        code: raw('../demos/raws/demos.style.changeStyle.raw'),
        des: 'Switch to another map style',
        sanbox: 'https://codesandbox.io/s/dituyangshi-dgdd8'
      },
      {
        name: '生成图标',
        key: 'generatedIcon',
        code: raw('../demos/raws/demos.style.generatedIcon.raw'),
        des: 'Add an icon to the map that was generated at runtime.',
        sanbox: 'https://codesandbox.io/s/shengchengtupian-t692w'
      },
      {
        name: '动画图标',
        key: 'animatedIcon',
        code: raw('../demos/raws/demos.style.animatedIcon.raw'),
        des:
          'Add an animated icon to the map that was generated at runtime with a Canvas.',
        sanbox: 'https://codesandbox.io/s/tianjiadonghuatupian-bv2vl'
      },
      {
        name: '图片插入',
        key: 'picIcon',
        code: raw('../demos/raws/demos.style.picIcon.raw'),
        des:
          'Add an icon to the map from an external URL and use it in a symbol layer.',
        sanbox: 'https://codesandbox.io/s/tianjiatupian-lry4d'
      }
    ]
  },
  layers: {
    title: '图层',
    items: [
      {
        name: '3D模型',
        key: 'model3D',
        code: raw('../demos/raws/demos.layers.model3D.raw'),
        des:
          'Use a custom style layer with three.js to add a 3D model to the map.',
        sanbox: 'https://codesandbox.io/s/3dmoxing-h8bms'
      },
      {
        name: '图片渲染多边形',
        key: 'polygonPic',
        code: raw('../demos/raws/demos.layers.polygonPic.raw'),
        des:
          'Use fill-pattern to draw a polygon from a repeating image pattern.'
      },

      {
        name: '点动画',
        key: 'pointAnimate',
        code: raw('../demos/raws/demos.layers.pointAnimate.raw'),
        des:
          'Animate the position of a point by updating a GeoJSON source on each frame.',
        sanbox: 'https://codesandbox.io/s/diandonghua-xpkwl'
      },
      {
        name: '图层透明度',
        key: 'opacityLayer',
        code: raw('../demos/raws/demos.layers.opacityLayer.raw'),
        des:
          'Drag the range slider to adjust the opacity of a raster layer on top of a map.',
        sanbox: 'https://codesandbox.io/s/tucengtoumingdu-yie0w'
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
        des: 'Animate a line by updating a GeoJSON source on each frame.',
        sanbox: 'https://codesandbox.io/s/xiandonghua-5ljy5'
      },

      {
        name: '三维室内',
        key: 'indoor3D',
        code: raw('../demos/raws/demos.layers.indoor3D.raw'),
        des:
          'Create a 3D indoor map with the fill-extrude-height paint property.',
        sanbox: 'https://codesandbox.io/s/sanweishinei-82gtg'
      },

      {
        name: 'HTML标注聚合',
        key: 'clusters',
        code: raw('../demos/raws/demos.layers.clusters.raw'),
        des: 'Display HTML clusters with custom properties',
        sanbox: 'https://codesandbox.io/s/htmljuhe-72q9z'
      },
      {
        name: 'Style标注聚合',
        key: 'styleClusters',
        code: raw('../demos/raws/demos.layers.styleClusters.raw'),
        des:
          'Use Mapbox GL JS built-in functions to visualize points as clusters.',
        sanbox: 'https://codesandbox.io/s/stylejuhe-sxu7z'
      },
      {
        name: '三维建筑',
        key: 'buildings3D',
        code: raw('../demos/raws/demos.layers.buildings3D.raw'),
        des: 'Use extrusions to display buildings height in 3D.',
        sanbox: 'https://codesandbox.io/s/3djianzhu-1tyyn'
      },
      {
        name: '大数据渲染',
        key: 'bigDataCircles',
        code: raw('../demos/raws/demos.layers.bigDataCircles.raw'),
        des:
          'Creating a visualization with a data expression for circle-color.',
        sanbox: 'https://codesandbox.io/s/dashujujuhe-hsvdw'
      },
      {
        name: '热力图',
        key: 'heatmap',
        code: raw('../demos/raws/demos.layers.heatmap.raw'),
        des:
          'Visualize earthquake frequency by location using a heatmap layer.',
        sanbox: 'https://codesandbox.io/s/relitu-ouqvc'
      },

      {
        name: '地形阴影',
        key: 'hillshading',
        code: raw('../demos/raws/demos.layers.hillshading.raw'),
        des: 'Adds raster hillshading to a map.',
        sanbox: 'https://codesandbox.io/s/dixingyinying-pqjlw'
      },
      {
        name: '渐变线',
        key: 'gradientLine',
        code: raw('../demos/raws/demos.layers.gradientLine.raw'),
        des:
          'Use the line-gradient paint property and an expression to visualize distance from the starting point of a line.'
      },
      {
        name: '多图层叠加',
        key: 'multipleGeometries',
        code: raw('../demos/raws/demos.layers.multipleGeometries.raw'),
        des: 'Add a polygon and circle layer from the same GeoJSON source.',
        sanbox: 'https://codesandbox.io/s/duotuceng-te0wh'
      },
      {
        name: '动态实时数据',
        key: 'realtime',
        code: raw('../demos/raws/demos.layers.realtime.raw'),
        des: 'Use realtime GeoJSON data streams to move a symbol on your map.',
        sanbox: 'https://codesandbox.io/s/dongtaishuaxin-pnx4h'
      }
    ]
  },
  sources: {
    title: '源',
    items: [
      {
        name: '矢量平铺源',
        key: 'vectortile',
        code: raw('../demos/raws/demos.sources.vectortile.raw'),
        des: 'Add a vector source to a map.',
        sanbox: 'https://codesandbox.io/s/vectorsource-lioqj'
      },
      {
        name: '画布源',
        key: 'canvas',
        code: raw('../demos/raws/demos.sources.canvas.raw'),
        des: 'Add a canvas source to the map.',
        sanbox: 'https://codesandbox.io/s/canvassource-0qkyo'
      },
      {
        name: '图片源',
        key: 'image',
        code: raw('../demos/raws/demos.sources.image.raw'),
        des: 'Dark vector baselayer with radar weather image overlay.',
        sanbox: 'https://codesandbox.io/s/imagesources-se7l1'
      },
      {
        name: '视频源',
        key: 'video',
        code: raw('../demos/raws/demos.sources.video.raw'),
        des:
          'Satellite raster baselayer with video on top. Click on the map to play and pause.',
        sanbox: 'https://codesandbox.io/s/videosource-h6ji9'
      },
      {
        name: 'WMS/WMTS源',
        key: 'wmts',
        code: raw('../demos/raws/demos.sources.wmts.raw'),
        des: 'Adding an external Web Map Service layer to the map.',
        sanbox: 'https://codesandbox.io/s/rastersource-603n2'
      },
      {
        name: '实时更新源',
        key: 'realtimeUpdate',
        code: raw('../demos/raws/demos.sources.realtimeUpdate.raw'),
        des:
          'Change an existing feature on your map in realtime by updating its data.',
        sanbox: 'https://codesandbox.io/s/shishigengxinyuan-e11hb'
      }
    ]
  },
  interaction: {
    title: '交互',
    items: [
      {
        name: '自定义动画',
        key: 'customizeAnimations',
        code: raw('../demos/raws/demos.interaction.customizeAnimations.raw'),
        des: 'Customize camera animations using AnimationOptions.'
      },
      {
        name: '点拖动',
        key: 'draggablePoint',
        code: raw('../demos/raws/demos.interaction.draggablePoint.raw'),
        des: 'Customize camera animations using AnimationOptions.',
        sanbox: 'https://codesandbox.io/s/keyidongdeicon-3m2r2'
      },
      {
        name: '过滤标识',
        key: 'filterSymbols',
        code: raw('../demos/raws/demos.interaction.filterSymbols.raw'),
        des: 'Customize camera animations using AnimationOptions.',
        sanbox: 'https://codesandbox.io/s/guolutuceng-h22zl'
      },
      {
        name: '功能开关',
        key: 'toggle',
        code: raw('../demos/raws/demos.interaction.toggle.raw'),
        des: 'Customize camera animations using AnimationOptions.'
      }
    ]
  }
} as DemoRoute
