const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
module.exports = {
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
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              [
                "@babel/preset-env",
                {
                  useBuiltIns: "usage",
                  corejs: {
                    //core-js的版本
                    version: 3,
                  },
                  //需要兼容的浏览器
                  targets: {
                    chrome: "23",
                    firefox: "21",
                    ie: "8",
                    safari: "6",
                    edge: "12",
                  },
                },
              ],
            ],
          },
        },
      },
      {
        test: /\.tsx?$/,
        use: "ts-loader",
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
