import React from 'react';
import { NavLink } from 'react-router-dom';
// MATERIAL-UI
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Zoom from '@material-ui/core/Zoom';

const useStyles = makeStyles(theme => ({
  title: {
    fontWeight: 'bold',
    width: '100%',
    marginTop: 20,
    marginBottom: 10,
  },
  gridContainer: {
    height: 500,
    maxWidth: 375,
    margin: 'auto'
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
      <Grid container spacing={4}>
        <Typography variant="h3" align="center" className={classes.title}>
          CATALOG
        </Typography>
        {props.products.map((product, index) => (
          <Zoom in={true} timeout={500}>

            <Grid item key={product.id} xs={12} className={classes.gridContainer}>
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
          </Zoom>
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
 