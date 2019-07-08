import { CircularProgress } from '@material-ui/core';
import React from 'react';
import useStyle from './style';

const Loading = () => {
  const classes = useStyle();

  return (
    <div className={classes.background}>
      <CircularProgress />
    </div>
  );
};

export default Loading;
