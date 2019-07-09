import store from '../index';

describe('Store', () => {
  it('should have default value', () => {
    expect(store.getState()).toEqual({ totalPage: 0, pages: {} });
  });
});
