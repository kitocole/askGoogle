const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = (env) => {
  return {
    entry: './client/index.js',
    output: {
      path: path.resolve(__dirname, 'build'),
      filename: 'bundle.js',
      publicPath: '/build/'
    },
    mode: env.NODE_ENV,
    plugins: [new MiniCssExtractPlugin()],
    module: {
      rules: [
        {
          test: /\.jsx?/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react']
            }
          }
        },
        { 
          test: /.(css|scss)$/,
          use: [
            "style-loader","css-loader","sass-loader",
          ],
        },
        {
          test: /\.css$/i,
          use: [MiniCssExtractPlugin.loader, "css-loader"],
        }
      ],
    },
    devServer: {
      hot: true,
      proxy: {
        '/api': 'http://localhost:3000'
      },
      // static: {
      //   directory: path.join(__dirname, 'build'),
      //   publicPath: 'build/bundle.js'
      // },
      static: {
        directory: path.join(__dirname, '/'),
        publicPath: '/'
      },
      port: 8080,
      headers: { 'Access-Control-Allow-Origin': '*'},
    },
  };
}