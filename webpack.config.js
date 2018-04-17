var path = require('path');
var SRC_DIR = path.join(__dirname, '/client/src');
var DIST_DIR = path.join(__dirname, '/client/dist');

const dotenv = require('dotenv').config({ path: path.resolve(SRC_DIR, './.env') });

const webpack = require('webpack');

let envVars = Object.entries(dotenv.parsed).reduce((obj, [key, value]) => {
    {
    obj[key] = JSON.stringify(value);
    return obj;
}}, {})

module.exports = {
  entry: `${SRC_DIR}/entry.js`,
  output: {
    filename: 'bundle.js',
    path: DIST_DIR
  },
  node: {
    fs: 'empty'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?/,
        include: SRC_DIR,
        exclude: /node-modules/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015']
        }
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': envVars,
    })
  ],  
};

// plugins: [
//   new dotenv({
//     path: '../../.env', // Path to .env file (this is the default) 
//     safe: true // load .env.example (defaults to "false" which does not use dotenv-safe) 
//   })
// ]