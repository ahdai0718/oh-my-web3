const path = require("path");
const webpack = require("webpack");
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");

module.exports = {
  mode: "development",
  entry: {
    app: path.join(__dirname, "src/index.ts"),
  },
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve("dist"),
    publicPath: "/web3tool/",
    clean: true,
  },
  plugins: [new NodePolyfillPlugin()],
};
