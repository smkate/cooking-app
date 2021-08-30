const path = require('path');
const config = require('./tasks/config');

module.exports = {
  context: process.cwd(),
  mode: process.env.NODE_ENV,
  entry: {
    app: config.scripts.input
  },
  output: {
    filename: '[name].js',
    path: config.scripts.output
  },
  devtool: process.env.NODE_ENV === 'development' ? 'source-map' : false,
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: false
            }
          }
        ],
        exclude: /node_modules/
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: '/node_modules/'
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.json'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@utils': path.resolve(__dirname, 'src/assets/scripts/utils/')
    }
  },
  devServer: {
    overlay: false
  }
};
