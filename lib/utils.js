'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.copyDate = copyDate;
exports.copyTime = copyTime;
exports.copyWithZeroTime = copyWithZeroTime;
exports.isExcluded = isExcluded;
exports.isInRange = isInRange;
exports.fitRange = fitRange;
var dateUnits = ['year', 'month', 'date'];
var timeUnits = ['hour', 'minute', 'second', 'millisecond'];

function copyDate(target, source) {
  dateUnits.forEach(function (unit) {
    return target[unit](source[unit]());
  });
  return target;
}

function copyTime(target, source) {
  timeUnits.forEach(function (unit) {
    return target[unit](source[unit]());
  });
  return target;
}

function copyWithZeroTime(target, source) {
  return target.set(source.toObject()).startOf('day');
}

function isExcluded(exclude, m) {
  if (exclude) {
    if (exclude.some(function (x) {
      return m.isSame(x);
    })) {
      return true;
    }
  }
  return false;
}

function isInRange(min, max, m) {
  if (min && max) {
    return m.isBetween(min, max, null, '[]');
  }

  if (min) {
    return m.isSameOrAfter(min);
  }

  if (max) {
    return m.isSameOrBefore(max);
  }
  return true;
}

function fitRange(min, max, value) {
  return Math.min(max, Math.max(min, value));
}