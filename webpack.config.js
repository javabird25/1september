let path = require('path');
let BundleTracker = require('webpack-bundle-tracker');

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
    })
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
