import { defineConfig } from 'umi'

export default defineConfig({
  base: './',
  publicPath: './',
  title: 'React-Mapbox-TS',
  alias: {
    'react-mapbox-ts': '@/../react-mapbox-ts/src/index.ts'
  },
  exportStatic: {
    htmlSuffix: true,
    dynamicRoot: true
  },

  hash: true,
  ignoreMomentLocale: true,
  inlineLimit: 10000,
  extraBabelPlugins: ['babel-plugin-macros'],
  dynamicImport: {
    loading: '@/components/page/page.loading.tsx'
  },
  chainWebpack: (memo) => {
    memo.module
      .rule('no-use-base64')
      .test(/no64/i)
      .use('file-loader')
      .loader('file-loader')
      .options({
        name: 'static/[name]-[hash:8].[ext]'
      })
  },
  devServer: {
    port: 8080
  }
})
