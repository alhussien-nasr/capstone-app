import { CATEGORIES_TYPES } from "./categoriesTypes";
const initialState = { loading: false, error: null, categories: [] };

export const categoriesReducer = (state = initialState, action = {}) => {
  const { type, payload } = action;

  switch (type) {
    case CATEGORIES_TYPES.FETCH_CATEGORIES_START:
      return { ...state, loading: true };
    case CATEGORIES_TYPES.FETCH_CATEGORIES_SUCCESS:
      return { ...state, loading: false, categories: payload };
    case CATEGORIES_TYPES.FETCH_CATEGORIES_FAILED:
      return { ...state, loading: false, error: payload };
    default:
      return state;
  }
};
