import { call, takeLatest, all, put } from "redux-saga/effects";
import { getCategory } from "../../utils/firebase";
import { CATEGORIES_TYPES } from "./categoriesTypes";
import {
  fetchCategoriesFailed,
  fetchCategoriesSuccess,
} from "./categoriesActions";
function* fetchCategories() {
  try {
    const Categories = yield call(getCategory, "categories");
    console.log("1");
    yield put(fetchCategoriesSuccess(Categories));
    console.log("2");
  } catch (e) {
    yield put(fetchCategoriesFailed(e));
  }
}

function* onFetchCategoryies() {
  yield takeLatest(CATEGORIES_TYPES.FETCH_CATEGORIES_START, fetchCategories);
}

export function* categoriesSaga() {
  yield all([call(onFetchCategoryies)]);
}
