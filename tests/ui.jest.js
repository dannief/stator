import React from 'react'
import renderer from 'react-test-renderer'
import {store, Store, connectStore} from '../src/statorgfc.js'

/* eslint-env jest */

afterEach(() => {
  store._store_created = false
  store._store = {}
  store._key_to_watcher_subscriptions = {}
  store._callback_objs = []
  store._cur_callback_id = 0
  store._pipeline_middleware = null
  store._user_pre_update_middleware_functions = []
})

test('Store component renders when state changes', () => {
  store.initialize({a: 1})

  const func = jest.fn()

  const component = renderer.create(
    <Store keys={['a']}>{keys => <div>{func()}</div>}</Store>
  )

  store.set('a', 2)

  expect(func.mock.calls.length).toBe(2)
})

test('Hoc renders when state changes and maps props', () => {
  store.initialize({a: 1})

  const func = jest.fn()

  const Comp = connectStore(['a'], state => ({b: state.a + 1}))(props => (
    <div>{func(props.state, props.b)}</div>
  ))

  const component = renderer.create(<Comp />)

  store.set('a', 2)

  expect(func.mock.calls.length).toBe(2)
  expect(func.mock.calls[1][0]).toEqual(store.get())
  expect(func.mock.calls[1][1]).toBe(3)
})
