const webpack = require("webpack");
const merge = require("webpack-merge");
const base = require("./webpack.base.config");
const nodeExternals = require("webpack-node-externals");
const VueSSRServerPlugin = require("vue-server-renderer/server-plugin");

module.exports = merge(base, {
  target: "node",
  devtool: "#source-map",
  entry: ["babel-polyfill", "./src/entry-server.js"],
  output: {
    filename: "server-bundle.js",
    libraryTarget: "commonjs2",
  },
  externals: nodeExternals({
    whitelist: /\.css$/,
  }),
  plugins: [
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1,
    }),
    new webpack.DefinePlugin({
      "process.env.VUE_ENV": '"server"',
    }),
    new VueSSRServerPlugin(),
  ],
});
