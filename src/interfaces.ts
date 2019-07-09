export type ToggleSidebarFunc = (cardData: ICardData | null) => void;

export interface ICardData {
  coreData: ICoreData;
  serviceData: IServiceData;
}

export interface ICoreData {
  number: string;
  lastUpdateDate: string;
  type: string;
  state: string;
  shortDescription: string;
  application: string;
  assignee: string;
}

export interface IServiceData {
  [s: string]: string;
}

export interface ISidebarContext {
  isOpen: boolean;
  cardData: ICardData | null;
  toggleSidebar: ToggleSidebarFunc;
}

export interface IPaginationContext {
  currentPage: number;
  totalPage: number;
  nextPage: () => void;
  lastPage: () => void;
}

export interface IAction {
  type: string;
  [s: string]: any;
}

export interface IStore {
  totalPage: number;
  pages: {
    [n: number]: ICardData[];
  };
}
