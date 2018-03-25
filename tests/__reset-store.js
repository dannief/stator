export default function(store) {
  store._store_created = false
  store._store = {}
  store._key_to_watcher_subscriptions = {}
  store._callback_objs = []
  store._cur_callback_id = 0
  store._pipeline_middleware = null
  store._user_pre_update_middleware_functions = []
}
