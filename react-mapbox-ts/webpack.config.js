const { resolve } = require('path')
const webpack = require('webpack')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const files = [
  {
    outputName: 'react-mapbox-ts',
    entryName: 'index'
  },
  {
    outputName: 'react-mapbox-ts.min',
    entryName: 'index',
    minimizer: true
  }
]

const PATHS = {
  src: resolve(__dirname, 'src'),
  output: resolve(__dirname, 'lib')
}

module.exports = files.map(({ entryName, outputName, minimizer }) => ({
  entry: `${PATHS.src}/${entryName}.tsx`,
  output: {
    path: PATHS.output,
    filename: `${outputName}.js`,
    libraryTarget: 'umd',
    library: 'ReactMapBox',
    auxiliaryComment: ''
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    modules: ['./src', 'node_modules']
  },
  resolveLoader: {
    moduleExtensions: ['-loader']
  },
  module: {
    rules: [
      {
        test: /\.ts(x)?$/,
        loader: 'awesome-typescript',
        include: [PATHS.src],
        options: {
          configFileName: 'tsconfig.standalone.json'
        }
      }
    ]
  },
  externals: {
    react: 'React',
    'mapbox-gl': 'mapboxgl'
  },
  mode: 'production',
  optimization: {
    minimizer: minimizer
      ? [
          new UglifyJsPlugin({
            uglifyOptions: {
              output: {
                comments: false
              }
            }
          })
        ]
      : []
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    })
  ]
}))
