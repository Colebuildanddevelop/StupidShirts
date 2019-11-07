import React, { useState, useEffect, Component } from 'react';
import { NavLink } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { addToCart } from '../../redux/actions';
// MATERIAL-UI
import Grid from '@material-ui/core/Grid';
import ButtonBase from '@material-ui/core/ButtonBase';
import CardMedia from '@material-ui/core/CardMedia';
import Container from '@material-ui/core/Container';
import Checkbox from '@material-ui/core/Checkbox';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Button from '@material-ui/core/Button';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';
import Fab from '@material-ui/core/Fab';

const useStyles = makeStyles(theme => ({
  button: {
    marginTop: 15,
    marginBottom: 30,
    background: 'white',
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    height: '100%',
    paddingLeft: 0,
    paddingRight: 0,
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    maxWidth: 375,
    margin: 'auto'
  },
  cardMedia: {
    height: 500,
    width: '100%',
    backgroundSize: "cover",
    marginBottom: 5,
  },
  cardDescription: {
    paddingTop: 20,
    paddingBottom: 30,
    paddingLeft: 10,
  },
  gridItem: {
    height: 70,
    width: 50,
    padding: 5,
  },
  button: {
    backgroundColor: 'black',
    color: 'white',
    width: '100%',
  },
  thumbnail: {
    minHeight: '100%',
    width: 'auto',
    border: 'solid black 1px',
  },

}));
// price needs to take data from say price that will add to cart...
const Display = (props) => {
  const classes = useStyles();
  const [photoNum, setPhoto] = useState(0);
  const handlePhotoClick = (num) => {
    setPhoto(num);
  }
  return (
    <React.Fragment>
      <Container className={classes.cardGrid}>     
        <Card className={classes.card} elevation={0}>
          {photoNum === 0 &&
            <CardMedia
              className={classes.cardMedia}
              image={props.product.metadata.imageOne}
              title={props.product.name}
            />             
          }
          {photoNum === 1 &&
            <CardMedia
              className={classes.cardMedia}
              image={props.product.metadata.imageTwo}
              title={props.product.name}
            />           
          }
          {photoNum === 2 &&
            <CardMedia
              className={classes.cardMedia}
              image={props.product.metadata.imageThree}
              title={props.product.name}
            />           
          }                              
          <div style={{margin: 'auto', width: '100%', marginBottom: 20}}>
            <Grid container item xs={12} stlye={{padding: 0, width: '100%', margin: 5}}>            
              <Grid item xs={4} className={classes.gridItem}>
                <ButtonBase onClick={() => handlePhotoClick(0)} style={{display: 'block', height: '100%', width: '100%'}} >
                  <CardMedia
                    className={classes.thumbnail}
                    image={props.product.metadata.imageOne}
                    title={props.product.name}
                  />
                </ButtonBase>
              </Grid>
              <Grid item xs={4} className={classes.gridItem}>
                <ButtonBase onClick={() => handlePhotoClick(1)} style={{display: 'block', height: '100%', width: '100%'}} >
                  <CardMedia
                    className={classes.thumbnail}
                    image={props.product.metadata.imageTwo}
                    title={props.product.name}
                  />
                </ButtonBase>
              </Grid>
              <Grid item xs={4} className={classes.gridItem}>
                <ButtonBase onClick={() => handlePhotoClick(2)} style={{display: 'block', height: '100%', width: '100%'}} >
                  <CardMedia
                    className={classes.thumbnail}
                    image={props.product.metadata.imageThree}
                    title={props.product.name}
                  />
                </ButtonBase>
              </Grid>  
            </Grid>              
          </div>    
          <Typography variant="h6" align="center">
            {props.product.name}         
          </Typography>
          <Typography variant="h9" align="center">
            {props.product.metadata.price}
          </Typography>  
          <Typography variant="p" align="left" className={classes.cardDescription}>
            {props.product.metadata.description}
          </Typography>       
          <FormControl component="fieldset" required style={{margin: 'auto'}}>
            <FormLabel component="legend" align="center">select size</FormLabel>
            <RadioGroup row value={props.selectedAttribute} onChange={props.handleChange}>
              <FormControlLabel
                control={<Radio />}
                label="XS"
                value="XS"                
              />    
              <FormControlLabel
                control={<Radio />}
                label="S"
                value="S"                
              />                        
              <FormControlLabel
                control={<Radio />}
                label="M"
                value="M"                
              />
              <FormControlLabel
                control={<Radio />}
                label="L"
                value="L"
              />
              <FormControlLabel
                control={<Radio />}
                label="XL"
                value="XL"
              />                            
            </RadioGroup>
          </FormControl>
          <NavLink style={{width: "100%", textDecoration: 'none', color: 'unset'}} to="/cart">  
            <Button variant="outlined" size="large"  className={classes.button} onClick={props.handleClick}>
              Add To Cart
            </Button>     
          </NavLink>
        </Card> 
      </Container>
    </React.Fragment>
  );
}

class ProductDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedAttribute: "XS",
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  componentDidMount() {
    console.log(this.props);
  }
  handleChange(e) {
    this.setState({
      selectedAttribute: e.target.value
    });
    console.log(this.state)
  }
  handleClick() {
    // funky
    let sku = this.props.skus.find(sku => {
      if ((sku.product === this.props.product.id) && (sku.attributes.name === this.state.selectedAttribute)) {
        return sku;
      }
    })
    let skuObject = {
      itemSku: sku,
      skuProduct: this.props.product,
    }
    // so far in this function we are checking to see if a sku exist, if so add if so dont add.
    if (this.props.items.length !== 0) {
      let inCartSkus = this.props.items.map((item, index) => {
        return item.itemSku.id;
      });
      let skuExist = inCartSkus.includes(sku.id);
      if (!skuExist) {
        this.props.addToCart(skuObject);
        console.log("added to cart");          
      } else {
        alert("This item is already in your cart.");
      }
    } else {
      this.props.addToCart(skuObject);
      console.log("added to cart");  
    }
  }
  render() {
    return (
      <React.Fragment>
        <Display 
          product={this.props.product}
          handleChange={this.handleChange}
          handleClick={this.handleClick}
          selectedAttribute={this.state.selectedAttribute}
        />
      </React.Fragment>
    );
  }
}

export default connect(
  null,
  { addToCart }
)(ProductDetails);