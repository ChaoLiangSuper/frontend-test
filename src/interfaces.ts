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

export interface IBaseAction {
  type: string;
}

export interface IAddPageAction extends IBaseAction {
  value: ICardData[];
  index: number;
}

export interface IRemoveAction extends IBaseAction {
  index: number;
}

export interface IUpdateTotalPage extends IBaseAction {
  totalPage: number;
}

export interface IFetchPage extends IBaseAction {
  currentPage: number;
}

export interface IStore {
  totalPage: number;
  pages: {
    [n: number]: ICardData[];
  };
}
