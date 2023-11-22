const webpack = require("webpack");
const merge = require("webpack-merge");
const base = require("./webpack.base.config");
const SWPrecachePlugin = require("sw-precache-webpack-plugin");
const VueSSRClientPlugin = require("vue-server-renderer/client-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

const config = merge(base, {
  entry: ["babel-polyfill", "./src/entry-client.js"],
  optimization: {
    runtimeChunk: {
      name: "manifest",
    },
    splitChunks: {
      chunks: "initial",
      cacheGroups: {
        vendor: {
          name: "vendor",
          test(module) {
            return /node_modules/.test(module.context) && !/\.css$/.test(module.request);
          },
        },
      },
    },
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env.VUE_ENV": '"client"',
    }),
    new VueSSRClientPlugin(),
  ],
});

if (process.env.NODE_ENV === "production") {
  config.plugins.push(
    new SWPrecachePlugin({
      cacheId: "frontend_template",
      filename: "service-worker.js",
      minify: true,
      dontCacheBustUrlsMatching: /./,
      staticFileGlobsIgnorePatterns: [/\.map$/, /\.json$/],
    })
  );
}
if (process.env.npm_config_report) {
  config.plugins.push(new BundleAnalyzerPlugin());
}

module.exports = config;
