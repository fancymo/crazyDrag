const PATH = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const theme = require('./theme.js');

module.exports = {
  entry: [PATH.resolve(__dirname, './src')],
  output: {
    path: PATH.resolve(__dirname, './dist'),
    filename: '[name].js',
    chunkFilename: '[chunkhash:8].chunk.js',
    publicPath: '/',
  },
  module: {
    preLoaders: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
      },
    ],
    loaders: [{
      test: /\.(js|jsx)$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
      include: PATH.resolve(__dirname, './src'),
      query: {
        presets: ['es2015', 'stage-2', 'react'],
        plugins: [
          ['import', [{ libraryName: 'antd', style: true }]],
        ]
      },
    }, {
      test: /\.less$/,
      loader: ExtractTextPlugin.extract('style-loader', `css-loader!less-loader?{modifyVars:${JSON.stringify(theme)}}`),
    }, {
      test: /\.css$/,
      loader: ExtractTextPlugin.extract('style-loader', 'css-loader'),
    }, {
      test: /\.(woff|woff2|svg|eot|ttf)\??.*$/,
      loader: 'file-loader?name=assets/fonts/[name].[ext]',
    }, {
      test: /\.(png|jpg|jpeg|gif)$/,
      loader: 'url-loader?limit=8192&name=assets/images/[name].[ext]',
    }],
  },
  plugins: [
    new CopyWebpackPlugin([
      { from: PATH.resolve(__dirname, './src/index.html') },
    ]),
    new ExtractTextPlugin('main.css'),
  ],
  resolve: {
    extensions: ['', '.js', '.json', '.jsx'],
    alisa: {},
  },
  eslint: {
    configFile: PATH.resolve(__dirname, './.eslintrc'),
    ignoreFile: PATH.resolve(__dirname, './.eslintignore'),
    failOnWarning: true, // eslint报warning了就终止webpack编译
    failOnError: true, // eslint报error了就终止webpack编译
    // cache: true // 开启eslint的cache，cache存在node_modules/.cache目录里
  },
  devServer: {
    contentBase: PATH.resolve(process.cwd(), 'dist'),
    port: 3737,
    host: '0.0.0.0',
    inline: true,
    noInfo: true,  // 过滤无关信息
    historyApiFallback: true,
    // publicPath 静态资源伺候地址
  },
};
