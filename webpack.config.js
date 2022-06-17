const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const webpackConfig = (env) => {
    return {
        entry: path.join(__dirname, "src", "index.tsx"),
        output: {
          filename: 'js/bundle.[contenthash].js',
          path: path.join(__dirname, 'dist'),
          clean: true
        },
        optimization: {
          splitChunks: {
            chunks: "all",
          },
        },
        devtool: env.mode === "development" ? "eval-source-map" : undefined,
        mode: env.mode,
        module: {
          rules: [
            {
              test: /\.tsx?$/,
              exclude: /node_modules/,
              use: "ts-loader"
            },
            {
				test: /\.css$/i,
				use: [MiniCssExtractPlugin.loader, 'css-loader'],
			},
          ],
        },
        resolve: {
          extensions: [".tsx", ".ts", ".js"],
        },
        plugins: [
          new CleanWebpackPlugin(),
          new HtmlWebpackPlugin({
            template: path.join(__dirname, "public", "index.html"),
          }),
          new MiniCssExtractPlugin()
        ],
        devServer: {
          static: __dirname,
          client: {
            logging: 'info',
            reconnect: true,
          },
          port: 4000
        },
    }
}
module.exports = webpackConfig