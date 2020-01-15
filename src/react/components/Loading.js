import React from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import { grey } from '@material-ui/core/colors';

const useStyles = makeStyles(theme => ({
  loadingCover: {
    width: '100%',
    height: 1000,
    position: 'absolute',
    top: '0%',
    left: '0%',
    zIndex: 1,
    background: grey[100],
  },
  container: {
    marginTop: 350,
  },
  LoadingProgress: {
    color: green[500],
    position: 'absolute',
    left: '10%',
    width: '80%',
    zIndex: 2,
  },      
}));

// @desc displays a loading component
const Loading = () => {
  const classes = useStyles();
  return (
    <Paper className={classes.loadingCover}>
      <div className={classes.container}>
        <Typography align='center' variant="h5">
          loading...
        </Typography>  
        <LinearProgress size={52} className={classes.LoadingProgress} />
      </div>  
    </Paper>      
  ) 
}

export default Loading;