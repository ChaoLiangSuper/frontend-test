import _ from 'lodash';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { cardsPerPage } from '../../config';
import { ICardData, IStore } from '../../interfaces';
import { PAGE_FETCH } from '../../store/constants';
import Card from '../Card';
import Loading from '../Loading';
import useStyle from './style';

const CardArea = ({
  cards,
  getPageData,
  currentPage,
}: {
  cards: ICardData[];
  getPageData: (n: number) => void;
  currentPage: number;
}) => {
  const classes = useStyle();

  useEffect(() => {
    getPageData(currentPage);
  }, [currentPage, getPageData]);

  return (
    <div className={classes.container}>
      {_.isNil(cards) ? (
        <Loading />
      ) : (
        <>
          {_.map(cards, (cardData, key) => (
            <Card cardData={cardData} key={key} />
          ))}
          {cards.length === cardsPerPage
            ? null
            : _.map(Array(cardsPerPage - cards.length), (value, key) => (
                <Card empty key={key} />
              ))}
        </>
      )}
    </div>
  );
};

export default connect(
  ({ pages }: IStore, { currentPage }: { currentPage: number }) => ({
    cards: pages[currentPage],
  }),
  (dispatch) => ({
    getPageData: (currentPage: number) =>
      dispatch({ type: PAGE_FETCH, currentPage }),
  })
)(CardArea);
