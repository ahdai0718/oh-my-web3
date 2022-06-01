const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    app: [path.join(__dirname, 'src/index.ts')],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve('dist'),
    publicPath: "/",
    filename: '[name].bundle.js',
  },
  devtool: 'eval-source-map',
  devServer: {
    watchFiles: ['src/**/*'],
    port: 30000,
  },
  optimization: {
    minimize: false,
    removeAvailableModules: false,
    removeEmptyChunks: false,
    splitChunks: {
      chunks: 'async',
      minSize: 30000,
      maxSize: 0,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '~',
      name: '',
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
  },
  plugins: [
    new NodePolyfillPlugin(),
    new webpack.DefinePlugin({
      __DEV__: true,
      __DEBUG__: true,
      __LOG_INFO__: true,
      __LOG_WARNING__: true,
      __LOG_ERROR__: true,
    }),
    new HtmlWebpackPlugin({
      title: 'Hello web3 !!',
      filename: 'index.html',
      template: 'src/index.html',
      chunks: ['app'],
      chunksSortMode: 'manual',
      alwaysWriteToDisk: true,
      minify: {
        removeAttributeQuotes: false,
        collapseWhitespace: false,
        html5: false,
        minifyCSS: false,
        minifyJS: false,
        minifyURLs: false,
        removeComments: false,
        removeEmptyAttributes: false,
      },
      hash: true,
    }),
  ],
};
