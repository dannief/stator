import {store, pipeline} from '../src/statorgfc.js'
import resetStore from './__reset-store'

/* eslint-env jest */

afterEach(() => {
  resetStore(store)
})

test('ensureImmutableUpdate: updates are deeply immutable', () => {
  store.initialize(
    {
      person: {
        name: {
          firstName: 'Dannie',
          lastName: 'Facey',
        },
      },
    },
    {immutable: false}
  )

  store.apply(pipeline.ensureImmutableUpdate)

  const oldState = store.get('person')

  store.set('person', person => {
    person.name.firstName = 'Debbie'
  })

  const newState = store.get('person')

  expect(oldState === newState).toBe(false)
  expect(oldState.name === newState.name).toBe(false)
})
