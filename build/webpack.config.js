const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
module.exports = {
  target: ['web', 'es5'],
  mode: "production",
  entry: "./library/index.ts",
  output: {
    path: path.resolve(__dirname, "../dist"),
    filename: "vue-validate-directive.js",
    library: {
      name: "vueValidateDirective",
      type: "umd",
    },
    clean: true,
  },
  externals: {
    vue: "Vue",
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: ["babel-loader", "ts-loader"],
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "../library/validate.css"),
          to: path.resolve(__dirname, "../dist"),
        },
      ],
    }),
  ],
};
