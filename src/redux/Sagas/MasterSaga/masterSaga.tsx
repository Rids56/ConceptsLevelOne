import { call, put, takeLatest } from "redux-saga/effects";
import {
  getCity,
  getClients,
  getCountries,
  getState,
} from "../../../assets/CommonApi/commonapi";
import {
  fetchCountry,
  fetchCountryFailure,
  fetchCountrySuccess,
} from "../../Slices/Country/countrySlice";
import {
  fetchState,
  fetchStateFailure,
  fetchStateSuccess,
  State,
} from "../../Slices/State/stateSlice";
import {
  fetchCity,
  fetchCityFailure,
  fetchCitySuccess,
} from "../../Slices/City/citySlice";
import { ClientState, fetchClient, fetchClientFailure, fetchClientSuccess } from "../../Slices/Client/clientSlice";

// Country start
// worker saga
function* fetchCountriesSaga() {
  try {
    const countries: [] = yield call(getCountries);
    yield put(fetchCountrySuccess(countries));
  } catch (error) {
    yield put(
      fetchCountryFailure(
        error instanceof Error ? error.message : "Unknown error"
      )
    );
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
    yield put(
      fetchStateFailure(
        error instanceof Error ? error.message : "Unknown error"
      )
    );
  }
}

export function* watchFetchState() {
  yield takeLatest(fetchState.type, fetchStatesSaga);
}
//State End

//City Start
function* fetchCitySaga(action: ReturnType<typeof fetchCity>) {
  const { state_name, country_name } = action.payload;
  try {
    const cities: [] = yield call(getCity, state_name);

    const data = cities?.map((item: State, index: number) => ({
      id: index + 1,
      country_name: country_name,
      state_name: state_name,
      ...item,
    }));

    yield put(fetchCitySuccess(data));
  } catch (error) {
    yield put(
      fetchCityFailure(error instanceof Error ? error.message : "Unknown error")
    );
  }
}

export function* watchFetchCity() {
  yield takeLatest(fetchCity.type, fetchCitySaga);
}
//City End


//Client Start
function* fetchClientsSaga(action: ReturnType<typeof fetchClient>) {
  const state = action.payload;
  
  try {
    const clients: ClientState = yield call(getClients, state);
    
    yield put(fetchClientSuccess(clients));
  } catch (error) {
    yield put(
      fetchClientFailure(
        error instanceof Error ? error.message : "Unknown error"
      )
    );
  }
}

export function* watchFetchClient() {
  yield takeLatest(fetchClient.type, fetchClientsSaga);
}
//Client End

