import _ from 'lodash';
import { runSaga } from 'redux-saga';
import { call } from 'redux-saga/effects';
import * as api from '../../api';
import { IAction } from '../../interfaces';
import {
  cacheOtherPages,
  cachePage,
  pageFetchWorker,
  removeOldPage,
} from '../workers';

const apiDefaultData = {
  data: [{ test: 'test' }],
  status: 200,
  statusText: 'ok',
  headers: { 'x-total-count': 24 },
  config: {},
};

const currentPage = 1;

describe('pageFetchWorker()', () => {
  const generator = pageFetchWorker({ type: '', currentPage });
  it('should fetch current page data', () => {
    expect(generator.next().value).toEqual(call(cachePage, currentPage));
  });

  it('should fetch neighbor page data', () => {
    expect(generator.next().value).toEqual(call(cacheOtherPages, currentPage));
  });

  it('should remove old page data', () => {
    expect(generator.next().value).toEqual(call(removeOldPage, currentPage));
  });
});

describe('cachePage', () => {
  let mockApi: jest.SpyInstance;

  beforeEach(() => {
    mockApi = jest
      .spyOn(api, 'fetchPage')
      .mockImplementation(() => Promise.resolve(apiDefaultData));
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('shoulde fetch page data and store it', async () => {
    const dispatched: IAction[] = [];

    await runSaga(
      {
        dispatch: (action: IAction) => dispatched.push(action),
        getState: () => ({ totalPage: 10, pages: {} }),
      },
      cachePage,
      currentPage
    );

    expect(mockApi).toHaveBeenCalledTimes(1);
    expect(dispatched[0]).toEqual({ type: 'UPDATE_TOTAL_PAGE', totalPage: 2 });
    expect(dispatched[1]).toEqual({
      type: 'ADD_PAGE',
      value: [{ test: 'test' }],
      index: 1,
    });
  });

  it('should not fetch page if exist in store', async () => {
    const dispatched: IAction[] = [];

    await runSaga(
      {
        dispatch: (action: IAction) => dispatched.push(action),
        getState: () => ({ totalPage: 10, pages: { 1: [{}] } }),
      },
      cachePage,
      currentPage
    );

    expect(mockApi).toHaveBeenCalledTimes(0);
    expect(dispatched).toHaveLength(0);
  });

  it('should not update total page number if same', async () => {
    const dispatched: IAction[] = [];

    await runSaga(
      {
        dispatch: (action: IAction) => dispatched.push(action),
        getState: () => ({ totalPage: 2, pages: {} }),
      },
      cachePage,
      currentPage
    );

    expect(mockApi).toHaveBeenCalledTimes(1);
    expect(dispatched).toHaveLength(1);
  });
});

describe('cacheOtherPages()', () => {
  let mockApi: jest.SpyInstance;

  beforeEach(() => {
    mockApi = jest
      .spyOn(api, 'fetchPage')
      .mockImplementation(() => Promise.resolve(apiDefaultData));
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should fetch next 4 pages and store it', async () => {
    const dispatched: IAction[] = [];

    await runSaga(
      {
        dispatch: (action: IAction) => dispatched.push(action),
        getState: () => ({ totalPage: 10, pages: {} }),
      },
      cacheOtherPages,
      currentPage
    );

    expect(mockApi).toHaveBeenCalledTimes(4);
    expect(
      _(dispatched)
        .filter(({ type }) => type === 'ADD_PAGE')
        .map('index')
        .sort()
        .value()
    ).toEqual([2, 3, 4, 5]);
  });

  it('should fetch 4 pages ahead and 4 pages before', async () => {
    const dispatched: IAction[] = [];

    await runSaga(
      {
        dispatch: (action: IAction) => dispatched.push(action),
        getState: () => ({ totalPage: 10, pages: {} }),
      },
      cacheOtherPages,
      5
    );

    expect(mockApi).toHaveBeenCalledTimes(8);
    expect(
      _(dispatched)
        .filter(({ type }) => type === 'ADD_PAGE')
        .map('index')
        .sort()
        .value()
    ).toEqual([1, 2, 3, 4, 6, 7, 8, 9]);
  });
});

describe('removeOldPage()', () => {
  it('should remove old pages if stored pages are more than max', () => {
    const dispatched: IAction[] = [];
    runSaga(
      {
        dispatch: (action: IAction) => dispatched.push(action),
        getState: () => ({
          totalPage: 10,
          pages: {
            1: [],
            2: [],
            3: [],
            4: [],
            5: [],
            6: [],
            7: [],
            8: [],
            9: [],
            10: [],
            11: [],
          },
        }),
      },
      removeOldPage,
      11
    );

    expect(dispatched).toHaveLength(2);
    expect(_.map(dispatched, 'index')).toEqual(['2', '1']);
  });

  it('should not remove page if it is less than max', () => {
    const dispatched: IAction[] = [];
    runSaga(
      {
        dispatch: (action: IAction) => dispatched.push(action),
        getState: () => ({
          totalPage: 10,
          pages: {
            1: [],
            2: [],
            3: [],
            4: [],
          },
        }),
      },
      removeOldPage,
      4
    );

    expect(dispatched).toHaveLength(0);
  });
});
