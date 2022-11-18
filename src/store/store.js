import {applyMiddleware, compose, createStore} from "redux";
import {rootReducer} from "./root-reducer";
import logger from "redux-logger";

// Custom logger. First function receives store
const loggerMiddleware = (_) => (next) => (action) => {
    if (!action.type) {
        return next(action)
    }

    // console.log({action})
    // console.log({currentState : store.getState()})

    next(action)

    // console.log({newState: store.getState()})
}

const middleWares = [loggerMiddleware,logger];

const composedEnhancers = compose(applyMiddleware(...middleWares))

export const store = createStore(rootReducer, undefined, composedEnhancers)