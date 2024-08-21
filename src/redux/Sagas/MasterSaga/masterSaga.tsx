import { call, put, takeLatest } from "redux-saga/effects";
import { getCountries } from "../../../assets/CommonApi/commonapi";
import {
  fetchCountry,
  fetchCountryFailure,
  fetchCountrySuccess,
} from "../../Slices/Country/countrySlice";

//worker saga
function* fetchCountriesSaga() {
  try {
    const countries: [] = yield call(getCountries);
    yield put(fetchCountrySuccess(countries));
  } catch (error) {
    yield put(fetchCountryFailure(error instanceof Error ? error.message : "Unknown error"));
  }
}

export function* watchFetchCountries() {
  yield takeLatest(fetchCountry.type, fetchCountriesSaga);
}
