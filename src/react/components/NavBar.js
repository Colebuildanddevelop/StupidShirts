import React from 'react';
// MATERIAL-UI
import AppBar from '@material-ui/core/AppBar';
import MenuIcon from '@material-ui/icons/Menu';
import LocalMallOutlinedIcon from '@material-ui/icons/LocalMallOutlined';
import IconButton from '@material-ui/core/IconButton';
import Slide from '@material-ui/core/Slide';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { NavLink } from 'react-router-dom';

function HideOnScroll(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({ target: window ? window() : undefined });
  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

const useStyles = makeStyles(theme => ({
  title: {
    flexGrow: 1,
  },
  icon: {
    color: 'black',
  }
}));

const NavBar = () => {
  const classes = useStyles();
  return (
    <React.Fragment>
      <HideOnScroll>
        <AppBar color="white" display="flex" elevation={0}>
          <Toolbar >
            <IconButton aria-label="menu" className={classes.icon}>
              <NavLink style={{ textDecoration: 'none', color: 'unset' }} to="/">
                <MenuIcon />
              </NavLink>  
            </IconButton>
            <Typography variant="h6" align="center" className={classes.title}>
              <NavLink style={{ textDecoration: 'none', color: 'unset' }} to="/" color="inherit">
                Stupid Shirts
              </NavLink>
            </Typography>
            <IconButton aria-label="cart" className={classes.icon}>
                <NavLink style={{ textDecoration: 'none', color: 'unset' }} to="/cart">
                  <LocalMallOutlinedIcon />
                </NavLink>
            </IconButton>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
    </React.Fragment>
  )
}


export default NavBar;