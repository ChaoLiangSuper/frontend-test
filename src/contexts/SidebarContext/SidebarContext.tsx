import _ from 'lodash';
import React, { createContext, useState } from 'react';
import {
  ICardData,
  ISidebarContext,
  ToggleSidebarFunc,
} from '../../interfaces';

export const Context = createContext<ISidebarContext>({
  isOpen: false,
  cardData: null,
  toggleSidebar: _.noop,
});

export const CustomProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, setState] = useState<ICardData | null>(null);

  const toggleSidebar: ToggleSidebarFunc = (cardData) => {
    setState(cardData);
  };

  return (
    <Context.Provider
      value={{ isOpen: !_.isNil(state), cardData: state, toggleSidebar }}
    >
      {children}
    </Context.Provider>
  );
};

export const SidebarProvider = CustomProvider;

export const SidebarConsumer = Context.Consumer;
