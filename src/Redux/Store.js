import {configureStore} from '@reduxjs/toolkit';
import EqSlice from './EqSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {persistReducer, persistStore} from 'redux-persist';
import thunk from 'redux-thunk';
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  // whitelist: [''],
};
const persistedReducer = persistReducer(persistConfig, EqSlice);

export const store = configureStore({
  reducer: {
    equipment: persistedReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
  middleware: [thunk],
});
export const persistor = persistStore(store);
