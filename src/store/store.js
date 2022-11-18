import {applyMiddleware, compose, createStore} from "redux";
import {rootReducer} from "./root-reducer";
import logger from "redux-logger";
import storage from "redux-persist/lib/storage"
import {persistReducer, persistStore} from "redux-persist";
import {loggerMiddleware} from "./middleware/logger";
import thunk from "redux-thunk";

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['cart']
}
const persistedReducer = persistReducer(persistConfig, rootReducer)

const middleWares = [loggerMiddleware(false), process.env.NODE_ENV === 'test' && logger, thunk].filter(Boolean);

const composeEnhancer = (process.env.NODE_ENV !== 'production' &&
    window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
) || compose
const composedEnhancers = composeEnhancer(applyMiddleware(...middleWares))

export const store = createStore(persistedReducer, undefined, composedEnhancers)
export const persistor = persistStore(store)