const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const webpackConfig = (env) => {
    return {
        entry: path.join(__dirname, "src", "app.tsx"),
        output: {
          filename: 'js/bundle.[contenthash].js',
          path: path.join(__dirname, 'dist'),
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
				use: ['style-loader', 'css-loader'],
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