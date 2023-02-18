import {UserData} from "../../utils/firebase/firebase.utils";
import {UserState} from "./user.reducer";
import {createSelector} from "reselect";
import {RootState} from "../store";

export const selectUserReducer = (state: RootState): UserState => state.user;
export const selectCurrentUser = createSelector(
    selectUserReducer,
    (userState) => userState.currentUser
)