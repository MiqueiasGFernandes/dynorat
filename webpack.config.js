const path = require('path');
const Dotenv = require('dotenv-webpack')

module.exports = {
  target: 'node', 
  entry: './server/index.ts',
  plugins: [
    new Dotenv()
  ],
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'build', 'server'),
  },
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
};