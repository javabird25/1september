const path = require('path');
const BundleTracker = require('webpack-bundle-tracker');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  context: __dirname,
  entry: {
    quiz: "./app/assets/js/quiz.js",
    compose: "./app/assets/js/compose",
  },
  output: {
    path: path.resolve('./static/webpack/'),
    filename: "[name]-[hash].js"
  },

  plugins: [
    new BundleTracker({
      filename: './static/webpack/webpack-stats.json',
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
    ],
  },
}