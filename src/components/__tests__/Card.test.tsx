import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  Typography,
} from '@material-ui/core';
import { mount, ReactWrapper } from 'enzyme';
import React from 'react';
import { mockCardData } from '../../__exampleData__/mockData';
import { Context } from '../../contexts/SidebarContext/SidebarContext';
import DataCard, { EmptyCard } from '../Card';

describe('<Card /> component', () => {
  let wrapper: ReactWrapper;
  beforeEach(() => {
    wrapper = mount(<DataCard cardData={mockCardData} />);
  });

  it('should successfully render without crash', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should contains both actions area and action bar', () => {
    expect(wrapper.find(Card)).toHaveLength(1);
    expect(wrapper.find(CardActionArea)).toHaveLength(1);
    expect(wrapper.find(CardActions)).toHaveLength(1);
  });

  it('should contains 5 text fields', () => {
    const textFields = wrapper.find(Typography);
    expect(textFields.at(0).text()).toEqual('State');
    expect(textFields.at(1).text()).toEqual('XXXXXX-NUM');
    expect(textFields.at(2).text()).toEqual('Application: Application');
    expect(textFields.at(3).text()).toEqual('Assignee: Assignee');
    expect(textFields.at(4).text()).toEqual('short description');
  });

  it('should trigger openSidebar function when click on card and button', () => {
    const clickSpy = jest.fn();

    wrapper = mount(
      <Context.Provider
        value={{
          isOpen: false,
          cardData: mockCardData,
          toggleSidebar: clickSpy,
        }}
      >
        <DataCard cardData={mockCardData} />
      </Context.Provider>
    );

    wrapper.find(CardActionArea).simulate('click');
    expect(clickSpy).toBeCalledTimes(1);
    wrapper.find(Button).simulate('click');
    expect(clickSpy).toBeCalledTimes(2);
  });
});

describe('<EmptyCard />', () => {
  let wrapper: ReactWrapper;
  beforeEach(() => {
    wrapper = mount(<EmptyCard />);
  });

  it('should successfully render without crash', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render with certain style', () => {
    expect(
      wrapper
        .find('div')
        .at(0)
        .hasClass('makeStyles-card-1')
    ).toBe(true);
  });
});
