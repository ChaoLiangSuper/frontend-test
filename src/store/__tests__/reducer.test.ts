import { mockCardData } from '../../__exampleData__/mockData';
import { ADD_PAGE, REMOVE_PAGE, UPDATE_TOTAL_PAGE } from '../constants';
import reducer, { initialState } from '../reducer';

describe('reducer', () => {
  it('should return default state', () => {
    expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should add new page', () => {
    expect(
      reducer(undefined, {
        type: ADD_PAGE,
        index: 1,
        value: [mockCardData],
      })
    ).toEqual({ ...initialState, pages: { 1: [mockCardData] } });
  });

  it('should remove page by index', () => {
    expect(
      reducer(
        {
          ...initialState,
          pages: { 1: [mockCardData] },
        },
        {
          type: REMOVE_PAGE,
          index: 1,
        }
      )
    ).toEqual({ ...initialState, pages: {} });
  });

  it('should update total page', () => {
    expect(
      reducer(undefined, {
        type: UPDATE_TOTAL_PAGE,
        totalPage: 10,
      })
    ).toEqual({ ...initialState, totalPage: 10 });
  });
});
