import {store} from '../src/statorgfc.js'
import resetStore from './__reset-store'

/* eslint-env jest */

afterEach(() => {
  resetStore(store)
})

test('cannot initialize twice', () => {
  store.initialize({})
  expect(() => store.initialize({})).toThrow('cannot create more than one global store')
})

test('immutability', () => {
  let orig_obj = {a: 1, b: 2}
  store.initialize({key: orig_obj}, {immutable: false})

  let new_obj = store.get('key')
  expect(orig_obj === new_obj).toBe(true)

  store.options.immutable = true
  new_obj = store.get('key')
  expect(orig_obj === new_obj).toBe(false)
})

test('cannot subscribe to invalid key', () => {
  store.initialize({mykey: 1})
  expect(() => {
    store.subscribeToKeys(['mykey1'], keys => {})
  }).toThrow('Store does not have key mykey1')

  expect(() => {
    store.subscribeToKeys('mykey', keys => {})
  }).toThrow('mykey must be an array')

  expect(() => {
    store.connectComponentState({}, 'mykey', keys => {})
  }).toThrow('mykey must be an array')
})

test('subscribe and unsubscribe', () => {
  store.initialize({count: 0})
  let v = false
  let unsubscribe = store.subscribe(() => (v = true))
  expect(v).toBe(false)

  store.set('count', store.get('count')) // nothing changed
  expect(v).toBe(false)

  store.set('count', store.get('count') + 1) // changed
  expect(v).toBe(true)

  // now unsubscribe and confirm the callback isn't triggered
  v = false
  unsubscribe()
  expect(v).toBe(false)
  expect(store.get('count')).toBe(1)
  store.set('count', store.get('count') + 1)
  expect(store.get('count')).toBe(2) // it did actually increment
  expect(v).toBe(false) // but we weren't notified
})

test('pre-update middlewares are called', () => {
  store.initialize({a: 0, b: 0})

  store.use(
    function(key, oldVal, newVal) {
      return true
    },
    function(key, oldval, newval) {
      if (key === 'b') {
        throw 'using pre-update middleware'
      }
    }
  )

  store.set({a: 1}) // nothing thrown

  expect(() => {
    store.set({b: 1})
  }).toThrow('using pre-update middleware')
})

test('pipeline middlewares are called', () => {
  store.initialize({a: 0, b: 0})

  store.apply(
    function(next, key, valOrUpdator, theStore) {
      try {
        next(key, valOrUpdator)
      } catch (err) {
        throw 'caught error: ' + err
      }
    },
    function(next, key, valOrUpdator, theStore) {
      if (key === 'b') {
        throw 'using middleware'
      }
    }
  )

  store.set({a: 1}) // nothing thrown

  expect(() => {
    store.set({b: 1})
  }).toThrow('caught error: using middleware')
})

test('pipeline middlewares can update value', () => {
  store.initialize({a: 0, b: 0})

  store.apply(
    function(next, key, val, theStore) {
      next(key, val + 1)
    },
    function(next, key, val, theStore) {
      next(key, val + 1)
    }
  )

  store.set({a: 1})

  expect(store.get('a')).toEqual(3)
})

test('state updater function', () => {
  store.initialize({a: 1, b: 0})

  store.set('a', oldVal => oldVal + 1)

  expect(store.get('a')).toEqual(2)
})

test('subscriber lists', () => {
  store.initialize({a: 0, b: 0})

  expect(store.getUnwatchedKeys()).toEqual(['a', 'b'])
  expect(store.getKeySubscribers()).toEqual({})

  let unsubscribe = store.subscribeToKeys(['a'], function some_function() {})
  expect(store.getUnwatchedKeys()).toEqual(['b'])
  expect(store.getKeySubscribers()).toEqual({a: [{id: 0, name: 'some_function'}]})

  unsubscribe()
  expect(store.getUnwatchedKeys()).toEqual(['a', 'b'])
  expect(store.getKeySubscribers()).toEqual({})
})
