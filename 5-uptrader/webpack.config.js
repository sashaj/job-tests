const path = require("path");
const gutil = require("gulp-util");
const webpack = require("webpack");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;

const isProduction = gutil.env.production || gutil.env.prod || false;
console.log("isprod", isProduction);

module.exports = {
  entry: "./src/js/index.js",
  mode: isProduction ? "production" : "development",
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "[name].bundle.js"
  },
  // devtool: !isProduction ? '#source-map' : '#cheap-module-eval-source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: [path.resolve(__dirname, "node_modules")]
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery"
    }),
    // new webpack.ProvidePlugin({
    //   noUiSlider: 'nouislider',
    // }),
    new UglifyJSPlugin({
      sourceMap: !isProduction
    })
    // new BundleAnalyzerPlugin()
  ]
};
