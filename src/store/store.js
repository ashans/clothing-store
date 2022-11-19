import {applyMiddleware, compose, createStore} from "redux";
import {rootReducer} from "./root-reducer";
import logger from "redux-logger";
import storage from "redux-persist/lib/storage"
import {persistReducer, persistStore} from "redux-persist";
import {loggerMiddleware} from "./middleware/logger";
import createSagaMiddleware from "redux-saga"
import {rootSaga} from "./root-saga";

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['cart']
}

const sagaMiddleware = createSagaMiddleware()
const persistedReducer = persistReducer(persistConfig, rootReducer)

const middleWares = [
    loggerMiddleware(false),
    process.env.NODE_ENV === 'development' && logger,
    // thunk
    sagaMiddleware
].filter(Boolean);

const composeEnhancer = (process.env.NODE_ENV !== 'production' &&
    window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
) || compose
const composedEnhancers = composeEnhancer(applyMiddleware(...middleWares))

export const store = createStore(persistedReducer, undefined, composedEnhancers)

sagaMiddleware.run(rootSaga)
export const persistor = persistStore(store)