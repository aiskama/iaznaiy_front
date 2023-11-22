const path = require("path");
const webpack = require("webpack");
const ExtractCssChunksPlugin = require("extract-css-chunks-webpack-plugin");
const TerserJSPlugin = require("terser-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const FriendlyErrorsPlugin = require("friendly-errors-webpack-plugin");
const { VueLoaderPlugin } = require("vue-loader");

const NODE_ENV = process.env.NODE_ENV || "development";
const isProd = NODE_ENV === "production";

module.exports = {
  mode: NODE_ENV,
  devtool: isProd ? "source-map" : "cheap-module-source-map",
  output: {
    path: path.resolve(__dirname, "../dist2"),
    publicPath: isProd ? "/dist/" : "/static/",
    filename: "[name].[chunkhash].js",
  },
  resolve: {
    alias: {
      static: path.resolve(__dirname, "../static"),
      "@": path.resolve(__dirname, "../src"),
      components: path.resolve(__dirname, "../src/components"),
      gql: path.resolve(__dirname, "../src/graphql"),
      plugins: path.resolve(__dirname, "../src/plugins"),
      fonts: path.resolve(__dirname, "../static/fonts"),
    },
  },
  module: {
    noParse: /es6-promise\.js$/,
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader",
        options: {
          compilerOptions: {
            preserveWhitespace: false,
          },
        },
      },
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg|svgz)(\?.+)?$/,
        loader: "url-loader",
        options: {
          limit: 10000,
          name: "[name].[ext]?[hash]",
        },
      },
      {
        test: /\.(graphql|gql)$/,
        exclude: /node_modules/,
        loader: "graphql-tag/loader",
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: "url-loader",
        options: {
          limit: 10000,
          name: "[name].[hash:7].[ext]",
        },
      },
      {
        test: /\.css$/i,
        use: ["style-loader", ExtractCssChunksPlugin.loader, "css-loader"],
      },
      {
        test: /\.styl(us)?$/,
        use: [isProd ? ExtractCssChunksPlugin.loader : "vue-style-loader", "css-loader", "stylus-loader"],
      },
    ],
  },
  performance: {
    maxEntrypointSize: 300000,
    hints: isProd ? "warning" : false,
  },
  optimization: {
    minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
  },
  plugins: [
    new VueLoaderPlugin(),
    new webpack.LoaderOptionsPlugin({
      options: {
        stylus: {
          use: [require("nib")(), require("rupture")()],
          import: [
            path.resolve(__dirname, "../src/styles/nibfix.styl"),
            "~nib/lib/nib/index.styl",
            "~rupture/rupture/index.styl",
          ],
        },
      },
    }),
    new ExtractCssChunksPlugin({
      filename: isProd ? "css/[name].[contenthash:8].css" : "[name].css",
      chunkFilename: isProd ? "css/[name].[contenthash:8].chunk.css" : "[name].chunk.css",
    }),
    ...(isProd ? [] : [new FriendlyErrorsPlugin()]),
  ],
};
