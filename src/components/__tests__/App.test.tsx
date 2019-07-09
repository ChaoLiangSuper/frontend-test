import { Container, CssBaseline } from '@material-ui/core';
import { mount, ReactWrapper, shallow, ShallowWrapper } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import { PaginationProvider } from '../../contexts/PaginationContext';
import { SidebarProvider } from '../../contexts/SidebarContext';
import App from '../App';
import Pagination from '../Pagination';

import { mockStore } from '../../__exampleData__/mockStore';

describe('<App /> component', () => {
  let wrapper: ShallowWrapper | ReactWrapper;
  beforeEach(() => {
    wrapper = shallow(<App />);
  });

  it('should successfully render without crash', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should contains <CssBaseline />', () => {
    expect(wrapper.find(CssBaseline)).toHaveLength(1);
  });

  it('should contains <Container />', () => {
    expect(wrapper.find(Container)).toHaveLength(1);
  });

  it('should contains <Pagination />', () => {
    expect(wrapper.find(Pagination)).toHaveLength(1);
  });

  it('should contains <PaginationProvider />', () => {
    expect(wrapper.find(PaginationProvider)).toHaveLength(1);
  });

  it('should contains <SidebarProvider />', () => {
    expect(wrapper.find(SidebarProvider)).toHaveLength(1);
  });

  it('should successfully mont with mock store', () => {
    wrapper = mount(
      <Provider store={mockStore}>
        <App />
      </Provider>
    );

    expect(wrapper).toMatchSnapshot();
  });
});
