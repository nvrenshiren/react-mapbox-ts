import { defineConfig } from 'umi'

export default defineConfig({
  alias: {
    'react-mapbox-ts': '@/../react-mapbox-ts/src/index'
  },
  exportStatic: {
    htmlSuffix: true,
    dynamicRoot: true
  },
  hash: true,
  ignoreMomentLocale: true,
  inlineLimit: 10000
})
