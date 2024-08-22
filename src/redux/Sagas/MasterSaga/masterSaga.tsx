import { call, put, takeLatest } from "redux-saga/effects";
import { getCountries, getState } from "../../../assets/CommonApi/commonapi";
import {
    fetchCountry,
    fetchCountryFailure,
    fetchCountrySuccess,
} from "../../Slices/Country/countrySlice";
import { fetchState, fetchStateFailure, fetchStateSuccess, State } from "../../Slices/State/stateSlice";

// Country start 
// worker saga 
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
//Country end

//State Start
function* fetchStatesSaga(action: ReturnType<typeof fetchState>) {
    const searchId = action.payload;
    try {
        const states: [] = yield call(getState, searchId);
        const data = states?.map((item: State, index: number) => ({
            id: index + 1,
            country_name: searchId,
            // isApiData: true,
            ...item,
        }));

        yield put(fetchStateSuccess(data));
    } catch (error) {
        yield put(fetchStateFailure(error instanceof Error ? error.message : "Unknown error"));
    }
}

export function* watchFetchState() {
    yield takeLatest(fetchState.type, fetchStatesSaga);
}
//State End
