const path = require('path');

module.exports = {
  // Other configuration options...
  
  resolve: {
    fallback: {
      "stream": require.resolve("stream-browserify"),
      "crypto": require.resolve("crypto-browserify")
    }
  }
};