import {Action, ActionWithPayload, createAction, withMatcher} from "../../utils/reducers/action.util";
import {CATEGORIES_ACTION_TYPES, Category} from "./categories.types";

export type FetchCategoriesStart = Action<CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START>;
export type FetchCategoriesSuccess = ActionWithPayload<CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS, Category[]>;
export type FetchCategoriesFailure = ActionWithPayload<CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED, Error>;

export const fetchCategoriesStart = withMatcher((): FetchCategoriesStart => createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START));

export const fetchCategoriesSuccess = withMatcher((response: Category[]): FetchCategoriesSuccess => createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS, response));

export const fetchCategoriesFailure = withMatcher((error: Error): FetchCategoriesFailure => createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED, error));
