const webpack = require("webpack");
const path = require("path");

module.exports = {
  mode: "production",

  entry: "./src/index",

  output: {
    library: "react-wordpress",
    libraryTarget: "umd",
    path: path.join(__dirname, "dist"),
    globalObject: "this",
    filename: "react-wordpress.min.js",
  },

  module: {
    rules: [
      {
        test: /\.js/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.svg$/,
        use: ["@svgr/webpack", "url-loader"],
      },
    ],
  },

  resolve: {
    extensions: [".js", ".jsx"],
  },

  externals: {
    react: {
      root: "React",
      commonjs2: "react",
      commonjs: "react",
      amd: "react",
    },
    "react-dom": {
      root: "ReactDOM",
      commonjs2: "react-dom",
      commonjs: "react-dom",
      amd: "react-dom",
    },
    "react-router-dom": {
      root: "ReactRouterDOM",
      commonjs2: "react-router-dom",
      commonjs: "react-router-dom",
      amd: "react-router-dom",
    },
    "@apollo/client": {
      root: "ApolloClient",
      commonjs2: "@apollo/client",
      commonjs: "@apollo/client",
      amd: "@apollo/client",
    },
  },

  node: {
    Buffer: false,
  },

  devtool: "source-map",

  performance: {
    hints: "warning",
  },
};
