import { Button } from '@material-ui/core';
import { mount } from 'enzyme';
import _ from 'lodash';
import React from 'react';
import { Context } from '../../contexts/PaginationContext/PaginationContext';
import Pagination from '../Pagination';

const defaultContextValue = {
  currentPage: 1,
  totalPage: 10,
  nextPage: _.noop,
  lastPage: _.noop,
};

describe('<Pagination /> component', () => {
  it('should successfully render without crash', () => {
    const wrapper = mount(
      <Context.Provider value={defaultContextValue}>
        <Pagination />
      </Context.Provider>
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should contains back and next buttons', () => {
    const clickSpy = jest.fn();

    const wrapper = mount(
      <Context.Provider
        value={{
          ...defaultContextValue,
          currentPage: 5,
          lastPage: clickSpy,
          nextPage: clickSpy,
        }}
      >
        <Pagination />
      </Context.Provider>
    );

    const buttons = wrapper.find(Button);
    expect(buttons).toHaveLength(2);

    buttons.at(0).simulate('click');
    expect(clickSpy).toBeCalledTimes(1);
    buttons.at(1).simulate('click');
    expect(clickSpy).toBeCalledTimes(2);
  });
});
