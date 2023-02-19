import {getCategoriesAndDocuments} from "../../utils/firebase/firebase.utils";
import {fetchCategoriesFailure, fetchCategoriesSuccess} from "./categories.action";
import {all, call, put, takeLatest} from 'typed-redux-saga/macro'
import {CATEGORIES_ACTION_TYPES} from "./categories.types";

export function* fetchCategoriesAsync() {
    try {
        const categories = yield* call(getCategoriesAndDocuments)
        yield put(fetchCategoriesSuccess(categories))
    } catch (error) {
        yield put(fetchCategoriesFailure(error as Error))
    }
}

export function* onFetchCategories() {
    yield  takeLatest(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START, fetchCategoriesAsync)
}

export function* categoriesSaga() {
    yield all([call(onFetchCategories)])
}