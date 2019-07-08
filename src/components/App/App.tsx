import { Container, CssBaseline } from '@material-ui/core';
import React from 'react';
import {
  PaginationConsumer,
  PaginationProvider,
} from '../../contexts/PaginationContext';
import { SidebarProvider } from '../../contexts/SidebarContext';
import CardArea from '../CardArea';
import Pagination from '../Pagination';
import Sidebar from '../Sidebar';
import useStyle from './style';

const App = () => {
  const classes = useStyle();

  return (
    <>
      <CssBaseline />
      <Container maxWidth='lg' fixed className={classes.page}>
        <PaginationProvider>
          <SidebarProvider>
            <PaginationConsumer>
              {({ currentPage }) => <CardArea currentPage={currentPage} />}
            </PaginationConsumer>
            <Sidebar />
          </SidebarProvider>
          <Pagination />
        </PaginationProvider>
      </Container>
    </>
  );
};

export default App;
