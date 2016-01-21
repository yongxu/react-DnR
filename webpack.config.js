var webpack = require('webpack');
var path = require('path');

module.exports = {
  entry: [
    //'webpack-dev-server/client?http://localhost:3000',
    //'webpack/hot/dev-server',
    './src/index.js' 
  ],
  devtool: 'source-map',
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [{
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        loader: 'babel'
      }, {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      }, {
        test: /\.scss$/,
        loaders: ['style', 'css', 'autoprefixer?browsers=last 2 versions',
          "sass?outputStyle=expanded&"
        ]
      },{
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: "file"
      }, {
        test: /\.(woff|woff2)$/,
        loader: "url?prefix=font/&limit=5000"
      }, {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url?limit=10000&mimetype=application/octet-stream"
      }, {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url?limit=10000&mimetype=image/svg+xml"
      }, {
        test: /\.gif/,
        loader: "url-loader?limit=10000&mimetype=image/gif"
      }, {
        test: /\.jpg/,
        loader: "url-loader?limit=10000&mimetype=image/jpg"
      }, {
        test: /\.png/,
        loader: "url-loader?limit=10000&mimetype=image/png"
      }
    ]
  },
  devServer: {
    contentBase: "./public",
    hot: true,
    inline: true,
    port: 3000
  },
  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ]
};