import React from 'react';
// MATERIAL-UI
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import InstagramIcon from '@material-ui/icons/Instagram';
import TwitterIcon from '@material-ui/icons/Twitter';
import FacebookIcon from '@material-ui/icons/Facebook';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { NavLink } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  footer: {
    padding: theme.spacing(4),
    maxWidth: 500,
    margin: 'auto',
  },
  icon: {
    width: '100%',
  }
}));

const Copyright = () => {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <NavLink style={{ textDecoration: 'none', color: 'unset' }} to="/cart">
        Stupid Shirts
      </NavLink>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const Footer = () => {
  const classes = useStyles();
  return (
    <React.Fragment>
      {/* Footer */}
      <footer className={classes.footer}>
        <Grid container xs={12}>
          <Grid item xs={4}>
            <InstagramIcon className={classes.icon}/>
          </Grid>
          <Grid item xs={4}>
            <TwitterIcon className={classes.icon}/>
          </Grid>
          <Grid item xs={4}>
            <FacebookIcon className={classes.icon}/>
          </Grid>
        </Grid>

        <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
          Follow us on Social Media!
        </Typography>
        <Copyright />
      </footer>
      {/* End footer */}
    </React.Fragment>
  )
}

export default Footer;

