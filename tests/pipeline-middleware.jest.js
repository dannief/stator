import {store, pipeline} from '../src/statorgfc.js'

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

test('updates are deeply immutable', () => {
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
