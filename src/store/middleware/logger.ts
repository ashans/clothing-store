import {Middleware} from "redux";
import {RootState} from "../store";

type CustomLoggerResolver = (enabled: boolean) => Middleware<{}, RootState>;
export const loggerMiddleware: CustomLoggerResolver = (enabled) => (store) => (next) => (action) => {
    if (enabled) {
        if (!action.type) {
            return next(action)
        }

        console.log({action})
        console.log({currentState: store.getState()})

        next(action)

        console.log({newState: store.getState()})
    } else {
        next(action)
    }
}