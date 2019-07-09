import { act, renderHook } from '@testing-library/react-hooks';
import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import { mockStore } from '../../__exampleData__/mockStore';
import {
  PaginationConsumer,
  PaginationProvider,
} from '../../contexts/PaginationContext';
import { CustomProvider } from '../../contexts/PaginationContext/PaginationContext';

describe('<PaginationContext /> component', () => {
  it('should successfully render without crash', () => {
    const wrapper = mount(
      <Provider store={mockStore}>
        <PaginationProvider>
          <PaginationConsumer>{() => null}</PaginationConsumer>
        </PaginationProvider>
      </Provider>
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should have default hook state', () => {
    const { result } = renderHook(() =>
      CustomProvider({ totalPage: 2, children: null })
    );

    expect(result.current.props.value.currentPage).toEqual(1);
    expect(result.current.props.value.totalPage).toEqual(2);

    act(() => {
      result.current.props.value.nextPage();
    });
    expect(result.current.props.value.currentPage).toEqual(2);

    act(() => {
      result.current.props.value.nextPage();
    });
    expect(result.current.props.value.currentPage).toEqual(2);

    act(() => {
      result.current.props.value.lastPage();
    });
    expect(result.current.props.value.currentPage).toEqual(1);

    act(() => {
      result.current.props.value.lastPage();
    });
    expect(result.current.props.value.currentPage).toEqual(1);
  });
});
