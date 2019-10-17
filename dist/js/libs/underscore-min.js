"use strict";

var range = function range(start, stop, step) {
  stop = stop || 0;
  start = start || 0;
  step = step || 1;
  var length = Math.max(Math.ceil((stop - start) / step), 0);
  var idx = 0;
  var range = new Array(length);

  while (idx < length) {
    range[idx++] = start;
    start += step;
  }

  return range;
};