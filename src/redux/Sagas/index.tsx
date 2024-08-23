import { all } from "redux-saga/effects";
import {
  watchFetchCity,
  watchFetchClient,
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
  ]);
}

export default rootSaga;
