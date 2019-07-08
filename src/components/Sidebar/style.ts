import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  sidebar: {
    width: 500,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: theme.zIndex.tooltip,
  },
  leftColumn: {
    minWidth: 150,
  },
  rightColumn: {
    borderBottom: `1px solid ${theme.palette.grey[300]}`,
    width: '100%',
  },
}));
