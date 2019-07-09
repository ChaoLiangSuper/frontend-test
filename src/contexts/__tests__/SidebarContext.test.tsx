import { act, renderHook } from '@testing-library/react-hooks';
import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import { mockStore } from '../../__exampleData__/mockStore';
import { SidebarConsumer, SidebarProvider } from '../SidebarContext';
import { CustomProvider } from '../SidebarContext/SidebarContext';

describe('<SidebarContext /> component', () => {
  it('should successfully render without crash', () => {
    const wrapper = mount(
      <Provider store={mockStore}>
        <SidebarProvider>
          <SidebarConsumer>{() => null}</SidebarConsumer>
        </SidebarProvider>
      </Provider>
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should have default hook state', () => {
    const { result } = renderHook(() => CustomProvider({ children: null }));

    expect(result.current.props.value.cardData).toEqual(null);
    expect(result.current.props.value.isOpen).toEqual(false);
    act(() => {
      result.current.props.value.toggleSidebar({});
    });
    expect(result.current.props.value.isOpen).toEqual(true);
  });
});
