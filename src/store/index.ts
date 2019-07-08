import _ from 'lodash';
import { applyMiddleware, createStore } from 'redux';
import { logger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import reducer from './reducer';
import watchers from './watchers';

const isDev = process.env.NODE_ENV === 'development';

const saga = createSagaMiddleware();

const store = createStore(
  reducer,
  applyMiddleware(..._.compact([saga, isDev ? logger : null]))
);

saga.run(watchers);

export default store;
