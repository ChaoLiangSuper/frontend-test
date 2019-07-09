import { mount, shallow } from 'enzyme';
import _ from 'lodash';
import React from 'react';
import { Provider } from 'react-redux';
import { mockCardData } from '../../__exampleData__/mockData';
import { mockStore } from '../../__exampleData__/mockStore';
import DataCard, { EmptyCard } from '../Card';
import CardArea from '../CardArea';
import { CardArea as CardAreaComponent } from '../CardArea/CardArea';
import Loading from '../Loading';

describe('<CardArea /> component', () => {
  it('should successfully render without crash', () => {
    const wrapper = mount(
      <Provider store={mockStore}>
        <CardArea currentPage={1} />
      </Provider>
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should render loading if cards are unavailable', () => {
    const wrapper = shallow(
      <CardAreaComponent getPageData={_.noop} currentPage={1} />
    );

    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find(Loading)).toHaveLength(1);
  });

  it('should render <Card /> and <EmptyCard />', () => {
    let wrapper = shallow(
      <CardAreaComponent
        cards={_.map(Array(10), () => mockCardData)}
        getPageData={_.noop}
        currentPage={1}
      />
    );

    expect(wrapper.find(DataCard)).toHaveLength(10);
    expect(wrapper.find(EmptyCard)).toHaveLength(2);

    wrapper = shallow(
      <CardAreaComponent
        cards={_.map(Array(12), () => mockCardData)}
        getPageData={_.noop}
        currentPage={1}
      />
    );

    expect(wrapper.find(EmptyCard)).toHaveLength(0);
  });
});
