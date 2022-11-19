import {createAction} from "../../utils/reducers/action.util";
import {CATEGORIES_ACTION_TYPES} from "./categories.types";

export const fetchCategoriesStart = () => createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START);

export const fetchCategoriesSuccess = (response) => createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS, response);

export const fetchCategoriesFailure = (error) => createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED, error);
