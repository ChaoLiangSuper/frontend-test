import { Button, Typography } from '@material-ui/core';
import React from 'react';
import { PaginationConsumer } from '../../contexts/PaginationContext';
import useStyle from './style';

const Pagination = () => {
  const classes = useStyle();

  return (
    <PaginationConsumer>
      {({ currentPage, totalPage, nextPage, lastPage }) =>
        totalPage === 0 ? null : (
          <div className={classes.pageNavigation}>
            <Button
              className={classes.button}
              onClick={lastPage}
              disabled={currentPage <= 1}
            >
              BACK
            </Button>
            <Typography
              className={classes.pageText}
              variant='button'
            >{`Page ${currentPage} of ${totalPage}`}</Typography>
            <Button
              className={classes.button}
              onClick={nextPage}
              disabled={currentPage >= totalPage}
            >
              NEXT
            </Button>
          </div>
        )
      }
    </PaginationConsumer>
  );
};

export default Pagination;
