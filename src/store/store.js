import { createStore, compose, applyMiddleware } from "redux";
import { logger } from "redux-logger";
import { rootReducer } from "./root-reducer";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import createSagaMiddleware from "redux-saga";
import { rootSaga } from "./root-saga";

const sagaMiddleware = createSagaMiddleware();

const middlewares = [
  process.env.NODE_ENV !== "production" && logger,
  sagaMiddleware,
].filter(Boolean);

const composeEnhancer = compose(applyMiddleware(...middlewares));

const persistConfig = {
  key: "root",
  storage,
  whiteList: ["cart"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(persistedReducer, undefined, composeEnhancer);

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);
