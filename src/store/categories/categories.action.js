import {createAction} from "../../utils/reducers/action.util";
import {CATEGORIES_ACTION_TYPES} from "./categories.types";
import {getCategoriesAndDocuments} from "../../utils/firebase/firebase.utils";

export const fetchCategoriesStart = () => createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START);

export const fetchCategoriesSuccess = (response) => createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS, response);

export const fetchCategoriesFailure = (error) => createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED, error);

export const fetchCategoriesAsync = () => async (dispatch) => {
    dispatch(fetchCategoriesStart());
    try {
        const categories = await getCategoriesAndDocuments()
        dispatch(fetchCategoriesSuccess(categories))
    } catch (error) {
        dispatch(fetchCategoriesFailure(error))
    }
}