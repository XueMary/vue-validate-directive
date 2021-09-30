const path = require('path');
const CopyPlugin = require("copy-webpack-plugin");
module.exports = {
  mode: 'production',
  entry: './library/index.ts',
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'vue-validate-directive.js',
    library: {
      name: 'vueValidateDirective',
      type: 'umd',
    },
    clean: true
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
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: path.resolve(__dirname, "../library/validate.css"), to: path.resolve(__dirname, "../dist") },
      ],
    }),
  ],
};