import { all } from "redux-saga/effects";
import {
  watchFetchCity,
  watchFetchCountries,
  watchFetchState,
} from "./MasterSaga/masterSaga";

function* rootSaga() {
  yield all([
    // ...imported sagas go here
    watchFetchCountries(),
    watchFetchState(),
    watchFetchCity(),
  ]);
}

export default rootSaga;
