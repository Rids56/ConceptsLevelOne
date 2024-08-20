import { all } from 'redux-saga/effects';
import { watchFetchCountries } from './MasterSaga/masterSaga';

function* rootSaga() {
  yield all([
    // ...imported sagas go here
    watchFetchCountries(),
  ]);
}

export default rootSaga;