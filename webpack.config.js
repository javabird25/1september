const path = require('path');
const BundleTracker = require('webpack-bundle-tracker');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  context: __dirname,
  entry: {
    common: "./app/assets/js/common.js",
    quiz: "./app/assets/js/quiz.js",
    compose: "./app/assets/js/compose",
    gallery_base: "./app/assets/js/gallery/base.js",
    gallery_visit: "./app/assets/js/gallery/visit.js",
    gallery_moderation: "./app/assets/js/gallery/moderation.js",
  },
  output: {
    path: path.resolve('./webpack-out'),
    filename: "[name]-[hash].js"
  },

  plugins: [
    new BundleTracker({
      filename: './webpack-out/webpack-stats.json',
    }),
    new CleanWebpackPlugin()
  ],

  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader',
        ],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        },
      },
    ],
  },
}
