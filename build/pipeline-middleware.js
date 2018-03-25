'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pipeline = undefined;

var _immer = require('immer');

var _immer2 = _interopRequireDefault(_immer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ensureImmutableUpdate(next, key, newValOrUpdator, store) {
  var newVal = newValOrUpdator;
  if (isFunction(newValOrUpdator)) {
    newVal = (0, _immer2.default)(store.get(key), newValOrUpdator);
  }
  next(key, newVal);
}

function isFunction(value) {
  return Object.prototype.toString.call(value) === '[object Function]';
}

var pipeline = {
  ensureImmutableUpdate: ensureImmutableUpdate
};

exports.pipeline = pipeline;