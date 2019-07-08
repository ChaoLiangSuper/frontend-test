import { makeStyles } from '@material-ui/core';

export default makeStyles(({ typography, spacing }) => {
  return {
    card: {
      width: 250,
      display: 'inline-block',
      margin: spacing(1),
    },
    description: {
      display: '-webkit-box',
      '-webkit-line-clamp': 2,
      '-webkit-box-orient': 'vertical',
      overflow: 'hidden',
      height: typography.fontSize * Number(typography.body2.lineHeight) * 2,
    },
  };
});
