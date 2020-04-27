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
  inlineLimit: 10000,
  extraBabelPlugins: ['babel-plugin-macros'],
  dynamicImport: {},

  chainWebpack: (memo) => {
    memo.module
      .rule('no-use-base64')
      .test(/no64/i)
      .use('file-loader')
      .loader('file-loader')
      .options({
        name: 'static/[name]-[hash:8].[ext]'
      })


  }
})
