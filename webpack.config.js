const Dotenv = require("dotenv-webpack");

module.exports = {
  plugins: [new Dotenv()],
  entry: "./src/index.js",
  module: {
    rules: [
      //...
      {
        test: /\.svg$/,
        use: ["@svgr/webpack"],
      },
    ],
  },
};
