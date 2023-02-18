import {createSelector} from "reselect";
import {CategoriesState} from "./categories.reducer";
import {CategoryMap} from "./categories.types";

const selectCategoryReducer = (state): CategoriesState => state.categories;

export const selectCategories = createSelector(
    [selectCategoryReducer],
    (categoryState) => categoryState.categories
)

export const selectCategoriesMap = createSelector(
    [selectCategories],
    (categories) => categories.reduce((agg, category) => {
        agg[category.title.toLowerCase()] = category.items

        return agg
    }, {} as CategoryMap)
)

export const selectCategoriesLoading = createSelector(
    [selectCategoryReducer],
    (categoryState) => categoryState.isLoading
)