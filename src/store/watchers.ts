import { all, takeLatest } from 'redux-saga/effects';
import { PAGE_FETCH } from './constants';
import { pageFetchWorker } from './workers';

function* pageFetchWatcher() {
  yield takeLatest(PAGE_FETCH, pageFetchWorker);
}

export default function*() {
  yield all([pageFetchWatcher()]);
}
