import { createStore } from 'redux';

export const mockStore = createStore(() => ({ totalPage: 0, pages: {} }));
