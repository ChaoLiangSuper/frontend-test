import { makeStyles } from '@material-ui/core';

export default makeStyles(({ palette }) => ({
  background: {
    width: '100%',
    height: '100%',
    backgroundColor: palette.grey[100],
    position: 'absolute',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));
