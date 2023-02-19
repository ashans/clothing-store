import {
    AdditionalInformation,
    createAuthUser,
    createUserDocumentFromAuth,
    getCurrentUser,
    signInWithGooglePopup,
    signOutUser
} from "../../utils/firebase/firebase.utils";
import {all, call, put, takeLatest} from 'typed-redux-saga/macro'
import {
    EmailSignInStart,
    signInFailed,
    signInSuccess,
    signOutFailed,
    signOutSuccess,
    signUpFailed,
    SignUpStart,
    SignUpSuccess,
    signUpSuccess
} from "./user.action";
import {USER_ACTION_TYPES} from "./user.types";
import {User} from "firebase/auth";

export function* getSnapshotFromUserAuth(userAuth: User, additionalDetails?: AdditionalInformation) {
    try {
        const userSnapshot = yield* call(createUserDocumentFromAuth, userAuth, additionalDetails)
        if (userSnapshot && userSnapshot.exists()) {
            yield* put(signInSuccess({id: userSnapshot.id, ...userSnapshot.data()}))
        }
    } catch (error) {
        yield* put(signInFailed(error as Error))
    }
}

export function* signInWithGoogle() {
    try {
        const {user} = yield* call(signInWithGooglePopup);
        yield* call(getSnapshotFromUserAuth, user)
    } catch (error) {
        put(signInFailed(error as Error))
    }
}

export function* signInWithEmail({payload: {email, password}}: EmailSignInStart) {
    try {
        const userCredentials = yield* call(createAuthUser, email, password);
        if (userCredentials) {
            const {user} = userCredentials;
            yield* call(getSnapshotFromUserAuth, user)
        }
    } catch (error) {
        put(signInFailed(error as Error))
    }
}

export function* isUserAuthenticated() {
    try {
        const userAuth = yield* call(getCurrentUser);
        if (!userAuth) return;
        yield* call(getSnapshotFromUserAuth, userAuth)
    } catch (error) {
        yield* put(signInFailed(error as Error))
    }
}

export function* signUp({payload: {email, password, displayName}}: SignUpStart) {
    try {
        const userCredentials = yield* call(createAuthUser, email, password);
        if (userCredentials) {
            const {user} = userCredentials;
            yield* put(signUpSuccess(user, {displayName}))
        }
    } catch (error) {
        yield* put(signUpFailed(error as Error))
    }
}

export function* signOut() {
    try {
        yield* call(signOutUser)
        yield* put(signOutSuccess())
    } catch (error) {
        yield* put(signOutFailed(error as Error))
    }
}

export function* signInAfterSignUp({payload: {user, additionalDetails}}: SignUpSuccess) {
    yield* call(getSnapshotFromUserAuth, user, additionalDetails)
}

export function* onGoogleSignInStart() {
    yield* takeLatest(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START, signInWithGoogle)
}

export function* onEmailPassSignInStart() {
    yield* takeLatest(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, signInWithEmail)
}

export function* onCheckUserSession() {
    yield*  takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuthenticated)
}

export function* onSignUp() {
    yield* takeLatest(USER_ACTION_TYPES.SIGN_UP_START, signUp)
}

export function* onSignUpSuccess() {
    yield* takeLatest(USER_ACTION_TYPES.SIGN_UP_SUCCESS, signInAfterSignUp)
}

export function* onSignOutStart() {
    yield* takeLatest(USER_ACTION_TYPES.SIGN_OUT_START, signOut)
}

export function* userSagas() {
    yield* all([
        call(onCheckUserSession),
        call(onGoogleSignInStart),
        call(onEmailPassSignInStart),
        call(onSignUp),
        call(onSignUpSuccess),
        call(onSignOutStart)
    ])
}