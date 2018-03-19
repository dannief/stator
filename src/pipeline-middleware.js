import produce from 'immer'

function ensureImmutableUpdate(next, key, newValOrUpdator, store) {
  let newVal = newValOrUpdator
  if (isFunction(newValOrUpdator)) {
    newVal = produce(store.get(key), newValOrUpdator)
  }
  next(key, newVal)
}

function isFunction(value) {
  return Object.prototype.toString.call(value) === '[object Function]'
}

const pipeline = {
  ensureImmutableUpdate,
}

export {pipeline}
