import { defineConfig } from 'umi'

export default defineConfig({
  alias: {
    'react-mapbox-ts': '@/../react-mapbox-ts/src/index'
  },
  nodeModulesTransform: {
    type: 'none'
  }
})
