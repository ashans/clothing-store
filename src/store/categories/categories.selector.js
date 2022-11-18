import {createSelector} from "reselect";

const selectCategoryReducer = (state) => state.categories;

export const selectCategories = createSelector(
    [selectCategoryReducer],
    (categoryState) => categoryState.categories
)

export const selectCategoriesMap = createSelector(
    [selectCategories],
    (categories) => categories.reduce((agg, category) => {
        agg[category.title.toLowerCase()] = category.items

        return agg
    }, {})
)

export const selectCategoriesLoading = createSelector(
    [selectCategoryReducer],
    (categoryState) => categoryState.isLoading
)