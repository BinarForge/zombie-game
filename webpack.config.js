const path = require('path');

const config = {
  entry: './game.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'game.bundle.js'
  }
};

module.exports = config;