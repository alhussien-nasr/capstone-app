import {createStore, compose, applyMiddleware} from 'redux';
import {logger} from 'redux-logger';
import {rootReducer} from './root-reducer';
import {persistStore, persistReducer} from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
import {rootSaga} from './root-saga';
import AsyncStorage from '@react-native-async-storage/async-storage';

const sagaMiddleware = createSagaMiddleware();

const middlewares = [
  process.env.NODE_ENV !== 'production' && logger,
  sagaMiddleware,
].filter(Boolean);

const composeEnhancer = compose(applyMiddleware(...middlewares));

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: ['user', 'categories'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(persistedReducer, undefined, composeEnhancer);

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);
