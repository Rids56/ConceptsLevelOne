import { call, put, takeLatest } from "redux-saga/effects";
import { getCountries } from "../../../assets/CommonApi/commonapi";
import { COUNTRY } from "./Constant";

//worker saga
function* fetchCountriesSaga() {
    try {
        const countries = yield call(getCountries);
        yield put(fetchCountriesSuccess(countries));
    } catch (error) {
        yield put(fetchCountriesFailure(error.message));
    }
}

export function* watchFetchCountries() {
    // yield takeLatest(Consta.FETCH_COUNTRIES_REQUEST, fetchCountriesSaga);
    yield takeLatest(COUNTRY.LOAD, fetchCountriesSaga);
}