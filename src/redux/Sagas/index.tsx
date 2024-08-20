import { all } from 'redux-saga/effects';

function* rootSaga() {
  yield all([
    // ...imported sagas go here

  ]);
}

export default rootSaga;