import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  background: {
    width: '100%',
    height: '100%',
    backgroundColor: theme.palette.grey[100],
    position: 'absolute',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));
