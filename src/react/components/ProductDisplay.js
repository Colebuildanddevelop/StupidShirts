import React from 'react';
// MATERIAL-UI
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { NavLink } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
    paddingLeft: 0,
    paddingRight: 0,
  },
  gridContainer: {
    height: 500,
  },
  card: {
    height: "100%",
  },
  cardMedia: {
    height: "100%",
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));


const ProductDisplay = (props) => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Grid container spacing={4} className={classes.cardGrid}>
        {props.products.map((product, index) => (
          <Grid item key={product.id} xs={12} sm={6} md={6} className={classes.gridContainer}>
            <Card className={classes.card}>
              <NavLink style={{height: "100%"}} to={`/shirt_${index}`}>  
                <CardMedia
                  className={classes.cardMedia}
                  image={product.metadata.imageOne}
                  title={product.name}
                />
              </NavLink> 
            </Card>
          </Grid>
        ))}
      </Grid>
    </React.Fragment>
  )
} 

export default ProductDisplay;




/***
  const products = props.product.map((value, index) => 
    <div className="item" key={value.id.toString()}>
      <Link to={`/shirt_${index}`}>
        <img src={value.images[0]}/>
      </Link>
    </div>
  );
  return (
    <Box className="container">
      <img className="hero-graphic" src={heroGraphic}/>
      <div className="grid-container">
        { products }
      </div>
    </Box>
  ); 

***/
 