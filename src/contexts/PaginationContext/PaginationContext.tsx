import _ from 'lodash';
import React, { createContext, useState } from 'react';
import { connect } from 'react-redux';
import { IPaginationContext, IStore } from '../../interfaces';

export const Context = createContext<IPaginationContext>({
  currentPage: 1,
  totalPage: 1,
  nextPage: _.noop,
  lastPage: _.noop,
});

export const CustomProvider = ({
  totalPage,
  children,
}: {
  totalPage: number;
  children: React.ReactNode;
}) => {
  const [state, setState] = useState<number>(1);

  const nextPage = () => {
    const next = state + 1;
    setState(next > totalPage ? totalPage : next);
  };

  const lastPage = () => {
    const last = state - 1;
    setState(last < 1 ? 1 : last);
  };

  return (
    <Context.Provider
      value={{ currentPage: state, totalPage, nextPage, lastPage }}
    >
      {children}
    </Context.Provider>
  );
};

export const PaginationProvider = connect(({ totalPage }: IStore) => ({
  totalPage,
}))(CustomProvider);

export const PaginationConsumer = Context.Consumer;
