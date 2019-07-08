import _ from 'lodash';
import { all, call, put, select } from 'redux-saga/effects';
import * as api from '../api';
import { cardsPerPage } from '../config';
import { IFetchPage, IStore } from '../interfaces';
import { getCacheablePages, maxCacheablePages } from '../utils';
import { ADD_PAGE, REMOVE_PAGE, UPDATE_TOTAL_PAGE } from './constants';

const getCachedPageIndex = ({ pages }: IStore) => Object.keys(pages);
const getTotalPage = ({ totalPage }: IStore) => totalPage;

function* cachePage(currentPage: number) {
  const cachedPageIndex = yield select(getCachedPageIndex);

  if (_.includes(cachedPageIndex, String(currentPage))) {
    return;
  }

  const { data, headers } = yield call(api.fetchPage, currentPage);
  const totalPage = yield select(getTotalPage);
  const newTotalPage = _.ceil(headers['x-total-count'] / cardsPerPage);
  if (totalPage !== newTotalPage) {
    yield put({
      type: UPDATE_TOTAL_PAGE,
      totalPage: newTotalPage,
    });
  }

  yield put({
    type: ADD_PAGE,
    value: data,
    index: currentPage,
  });
}

function* cacheOtherPages(currentPage: number) {
  const totalPage = yield select(getTotalPage);
  const cacheablePages = getCacheablePages(currentPage, totalPage);
  yield all(_.map(cacheablePages, (page) => cachePage(page)));
}

function* removeOldPage(currentPage: number) {
  let cachedPageIndex = yield select(getCachedPageIndex);
  const oversize = cachedPageIndex.length - (maxCacheablePages + 1);
  if (oversize > 0) {
    cachedPageIndex = _.sortBy(cachedPageIndex, (index) =>
      Math.abs(Number(index) - currentPage)
    );
    const oversizeIndex = cachedPageIndex.slice(-oversize);

    yield all(
      _.map(oversizeIndex, (index) =>
        put({
          type: REMOVE_PAGE,
          index,
        })
      )
    );
  }
}

export function* pageFetchWorker({ currentPage }: IFetchPage) {
  yield all([cachePage(currentPage), cacheOtherPages(currentPage)]);
  yield removeOldPage(currentPage);
}
