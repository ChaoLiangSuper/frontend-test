import React from 'react';
import useStyle from './style';

const EmptyCard = () => {
  const classes = useStyle();
  return <div className={classes.card} />;
};

export default EmptyCard;
