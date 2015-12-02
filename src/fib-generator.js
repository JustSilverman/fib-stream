'use strict';

var FibSequence = function() {
  this._penultimate;
  this._last;
};

FibSequence.prototype.next = function() {
  var nextValue;

  if (this._penultimate === undefined) {
    this._penultimate = 0;
    nextValue = 0;
  } else if (this._last === undefined) {
    this._last = 1;
    nextValue = 1;
  } else {
    nextValue = this._penultimate + this._last;
    this._penultimate = this._last;
    this._last = nextValue;
  }

  return {
    value: nextValue,
    done: false
  }
};

module.exports = function() {
  return new FibSequence();
}
