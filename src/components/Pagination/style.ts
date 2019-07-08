import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  pageNavigation: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: `${theme.spacing(2)}px 0`,
  },
  pageText: {
    margin: `0 ${theme.spacing(5)}px`,
    fontWeight: 700,
  },
  button: {
    fontWeight: 700,
  },
}));
