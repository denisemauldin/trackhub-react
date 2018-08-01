const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const path = require("path")

module.exports = {
  context: path.resolve(__dirname, "./src"),
  mode: "production",
  entry: {
    app: "./client/index.js"
  },
  output: {
    chunkFilename: "[name].chunk.js",
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist", "assets"),
    publicPath: "/assets",
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: [/node_modules/],
        use: [
          { loader: "babel-loader" }
        ]
      },
      {
        test: /\.s?css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              modules: true,
              importLoaders: 1,
              localIdentName: "[name]_[local]",
              sourceMap: false,
              minimize: false
            }
          },
          {
            loader: "postcss-loader",
            options: {
              sourceMap: false
            }
          },
          {
            loader: "resolve-url-loader",
            options: {
              sourceMap: false
            }
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true
            }
          }
        ]
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: "babel-loader"
          },
          {
            loader: "react-svg-loader",
            options: {
              jsx: true
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2)?$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 50000,
              mimetype: "application/font-woff",
              name: "fonts/[name].[ext]"
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[name].[id].chunk.css"
    })
  ],
  resolve: {
    extensions: [".js", ".json", ".jsx"],
    alias: {
      connected: path.resolve(__dirname, "src", "shared", "components", "connected"),
      constants: path.resolve(__dirname, "src", "shared", "constants"),
      contexts: path.resolve(__dirname, "src", "shared", "contexts"),
      presentational: path.resolve(__dirname, "src", "shared", "components", "presentational"),
      store: path.resolve(__dirname, "src", "shared", "store"),
      routes: path.resolve(__dirname, "src", "shared", "routes"),
      scss: path.resolve(__dirname, "src", "shared", "scss"),
      svg: path.resolve(__dirname, "src", "shared", "svg")
    }
  }
}