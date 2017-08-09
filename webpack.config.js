const path = require('path');

const config = {
  entry: './Game.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'game.bundle.js'
  }
};

module.exports = config;