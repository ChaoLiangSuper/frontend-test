import { Drawer, IconButton, ListItem, Typography } from '@material-ui/core';
import { mount, shallow } from 'enzyme';
import _ from 'lodash';
import React from 'react';
import { mockCardData } from '../../__exampleData__/mockData';
import { Context } from '../../contexts/SidebarContext/SidebarContext';
import Sidebar from '../Sidebar';

const defaultContextValue = {
  isOpen: true,
  cardData: mockCardData,
  toggleSidebar: _.noop,
};

describe('<Sidebar /> component', () => {
  it('should successfully render without crash', () => {
    const wrapper = mount(
      <Context.Provider value={defaultContextValue}>
        <Sidebar />
      </Context.Provider>
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should not render fields if no cardData provided', () => {
    const wrapper = shallow(
      <Context.Provider value={{ ...defaultContextValue, cardData: null }}>
        <Sidebar />
      </Context.Provider>
    );

    expect(
      wrapper
        .dive()
        .dive()
        .find(Drawer)
        .children()
    ).toHaveLength(0);
  });

  it('should render fields for cardData', () => {
    const wrapper = mount(
      <Context.Provider value={defaultContextValue}>
        <Sidebar />
      </Context.Provider>
    );
    expect(wrapper.find(Typography).text()).toEqual('XXXXXX-NUM');
    expect(wrapper.find(ListItem)).toHaveLength(6);
  });

  it('should be ablt to close sidebar', () => {
    const clickSpy = jest.fn();

    const wrapper = mount(
      <Context.Provider
        value={{ ...defaultContextValue, toggleSidebar: clickSpy }}
      >
        <Sidebar />
      </Context.Provider>
    );

    wrapper.find(IconButton).simulate('click');
    expect(clickSpy).toBeCalledTimes(1);
  });
});
