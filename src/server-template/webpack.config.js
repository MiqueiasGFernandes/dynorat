const path = require('path')
const Dotenv = require('dotenv-webpack')

module.exports = {
  target: 'node',
  mode: 'production',
  entry: path.resolve(__dirname, 'src', 'index.ts'),
  plugins: [
    new Dotenv({
      path: path.resolve(__dirname, '.env')
    })
  ],
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'build', 'server')
  },
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js']
  }
}
