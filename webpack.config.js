const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: {
    main: "./src/js/index.js",
    filmDetails: "./src/js/filmDetails.js",
    searchResults: "./src/js/searchResults.js",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "js/[name].bundle.js",
    chunkFilename: "[id].bundle_[chunkhash].js",
    sourceMapFilename: "[file].map",
  },
  devServer: {
    contentBase: "./dist",
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "./src/index.html",
      chunks: ["main"],
    }),
    new HtmlWebpackPlugin({
      filename: "filmDetails.html",
      template: "./src/filmDetails.html",
      chunks: ["filmDetails"],
    }),
    new HtmlWebpackPlugin({
      filename: "searchResults.html",
      template: "./src/searchResults.html",
      chunks: ["searchResults"],
    }),
  ],
};
