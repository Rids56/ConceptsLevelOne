import { all } from "redux-saga/effects";
import {
  watchFetchCity,
  watchFetchClient,
  watchFetchClientScroll,
  watchFetchCountries,
  watchFetchState,
} from "./MasterSaga/masterSaga";

function* rootSaga() {
  yield all([
    // ...imported sagas go here
    watchFetchCountries(),
    watchFetchState(),
    watchFetchCity(),
    watchFetchClient(),
    watchFetchClientScroll(),
  ]);
}

export default rootSaga;
