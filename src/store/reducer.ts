import { IAction, IStore } from '../interfaces';
import { ADD_PAGE, REMOVE_PAGE, UPDATE_TOTAL_PAGE } from './constants';

export const initialState: IStore = {
  totalPage: 0,
  pages: {},
};

export default (state = initialState, action: IAction) => {
  switch (action.type) {
    case ADD_PAGE:
      return {
        ...state,
        pages: {
          ...state.pages,
          [action.index]: action.value,
        },
      };
    case REMOVE_PAGE: {
      const newPages = state.pages;
      delete newPages[action.index];
      return {
        ...state,
        pages: {
          ...newPages,
        },
      };
    }
    case UPDATE_TOTAL_PAGE:
      return {
        ...state,
        totalPage: action.totalPage,
      };
    default:
      return state;
  }
};
