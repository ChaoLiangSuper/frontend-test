import { mount } from 'enzyme';
import _ from 'lodash';
import React from 'react';
import Loading from '../Loading';

describe('<Loading /> component', () => {
  it('should successfully render without crash', () => {
    const wrapper = mount(<Loading />);
    expect(wrapper).toMatchSnapshot();
  });
});
