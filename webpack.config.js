/** @format */

const path = require('path')
const webpack = require('webpack')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')

const nodeEnv = process.env.NODE_ENV
const isProd = nodeEnv === 'production'
const distPath = path.join(__dirname, './dist')
const srcPath = path.join(__dirname, './src')

module.exports = {
  entry: {
    index: path.join(srcPath, 'index.tsx'),
    vendors: ['react', 'react-dom'],
  },
  output: {
    path: distPath,
    filename: 'js/[name].[hash].js',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        include: [srcPath],
        exclude: [/node_modules/, path.join(srcPath, 'main')],
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.less$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader'],
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: 'imgs/[name].[ext]?[hash]',
        },
      },
    ],
  },
  resolve: {
    alias: {
      '@': srcPath,
    },
    extensions: ['.js', '.ts', '.tsx'],
  },
  devtool: isProd ? 'source-map' : 'eval-source-map',
  // devtool: 'source-map',
  devServer: {
    historyApiFallback: true,
    port: 3003,
    contentBase: ['./'],
    inline: true,
    publicPath: '/',
    hot: true,
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HTMLWebpackPlugin({
      template: path.join(srcPath, 'index.html'),
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[hash].css',
      allChunks: true,
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env': {NODE_ENV: `"${nodeEnv}"`},
    }),
  ],
}
