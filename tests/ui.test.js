import React from 'react'
import renderer from 'react-test-renderer'
import {store, Store, connectStore} from '../src/statorgfc.js'
import resetStore from './__reset-store'

/* eslint-env jest */

afterEach(() => {
  resetStore(store)
})

test('Store component renders when state changes', () => {
  store.initialize({a: 1})

  const func = jest.fn()

  const component = renderer.create(
    <Store keys={['a']}>{keys => <div>{func()}</div>}</Store>
  )

  store.set('a', 2)

  expect(func).toHaveBeenCalledTimes(2)
})

test('Hoc renders when state changes and maps props', () => {
  store.initialize({a: 1})

  const func = jest.fn()

  const Comp = connectStore(['a'], state => ({b: state.a + 1}))(props => (
    <div>{func(props.state, props.b)}</div>
  ))

  const component = renderer.create(<Comp />)

  store.set('a', 2)

  expect(func).toHaveBeenCalledTimes(2)
  expect(func).toHaveBeenLastCalledWith(store.get(), 3)
})
