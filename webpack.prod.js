const { merge } = require("webpack-merge");
const webpack = require("webpack");
const common = require("./webpack.common.js");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = merge(common, {
  mode: "production",
  devtool: "source-map",
  devServer: {
    watchFiles: ["src/**/*"],
    port: 30000,
  },
  plugins: [
    new webpack.DefinePlugin({
      __DEV__: false,
      __DEBUG__: true,
      __LOG_INFO__: false,
      __LOG_WARNING__: true,
      __LOG_ERROR__: true,
    }),
    new HtmlWebpackPlugin({
      title: "Oh My Web3",
      filename: "index.html",
      template: "src/index.html",
      chunks: ["app"],
      chunksSortMode: "manual",
      alwaysWriteToDisk: true,
      minify: true,
      hash: true,
    }),
  ],
});
