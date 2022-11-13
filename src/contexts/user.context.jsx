import {createContext, useEffect, useReducer} from "react";
import {authListener, createUserDocumentFromAuth} from "../utils/firebase/firebase.utils";
import {createAction} from "../utils/reducers/action.util";

export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null,
});

export const USER_ACTION_TYPES = {
    SET_CURRENT_USER: 'SET_CURRENT_USER'
}

const userReducer = (state, action) => {
    const {type, payload} = action;

    switch (type) {
        case USER_ACTION_TYPES.SET_CURRENT_USER:
            return {
                ...state,
                currentUser: payload
            }
        default:
            throw new Error(`Unhandled type of action type - ${type}`)
    }
}

const INITIAL_STATE = {
    currentUser: null
}

export const UserProvider = ({children}) => {
    const [{currentUser}, dispatch] = useReducer(userReducer, INITIAL_STATE)

    const setCurrentUser = (user) => {
        dispatch(createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user))
    }
    const value = {currentUser, setCurrentUser};

    useEffect(() => {
        const unSubscribe = authListener((user) => {
            if (user) {
                createUserDocumentFromAuth(user);
            }
            setCurrentUser(user);
        })

        return () => {
            unSubscribe()
        }
    }, [])
    return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
