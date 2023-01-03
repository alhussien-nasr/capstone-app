import {createSelector} from 'reselect';
const selectCategoriesReducer = state => state.categories;

const selectCategories = createSelector(
  [selectCategoriesReducer],
  categories => categories.categories,
);

export const categoriesSelector = createSelector(
  [selectCategories],
  categories =>
    categories.reduce((acc, category) => {
      const {items, title} = category;
      acc[title.toLowerCase()] = items;
      return acc;
    }, {}),
);

