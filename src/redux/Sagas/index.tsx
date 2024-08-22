import { all } from 'redux-saga/effects';
import { watchFetchCountries, watchFetchState } from './MasterSaga/masterSaga';

function* rootSaga() {
  yield all([
    // ...imported sagas go here
    watchFetchCountries(),
    watchFetchState(),
  ]);
}

export default rootSaga;