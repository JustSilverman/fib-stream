'use strict';

var TransformStream = require('stream').Transform

function take(limit) {
  var transformStream = new TransformStream();
  var chunksWritten = 0;

  transformStream._transform = function(buf, encoding, cb) {
    if (chunksWritten < limit) {
      cb(null, buf.toString());
      chunksWritten++;
      return;
    }

    this.emit('end');
  };

  return transformStream;
}

module.exports = take;
