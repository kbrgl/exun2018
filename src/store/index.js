import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import rootSaga from './sagas'
import rootReducer from './reducers'

const persistConfig = {
  key: 'root',
  storage,
}

export default function configureStore() {
  const persistedReducer = persistReducer(persistConfig, rootReducer)
  const sagaMiddleware = createSagaMiddleware()
  const store = createStore(persistedReducer, applyMiddleware(sagaMiddleware))
  const persistor = persistStore(store)
  sagaMiddleware.run(rootSaga)
  return { store, persistor }
}
