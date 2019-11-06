import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { updateItemList } from '../../redux/actions';
import { NavLink } from 'react-router-dom';

// MATERIAL UI
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';

// TODO add remove from cart functionality 

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    paddingTop: theme.spacing(8),
    paddingLeft: 0,
    paddingRight: 0,
  },
  cartBox: {
    marginBottom: 50,
  },
  card: {
    flexGrow: 1,
    padding: theme.spacing(2),
    margin: 'auto',
    marginBottom: 10,
    maxWidth: 500,
  },
  image: {
    width: 48,
    height: 64,
    marginRight: 20,
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
  info: {
    flexGrow: 1,
  },
  formControl: {
    margin: 'dense',
    width: '20%',
  },
  subtotalBox: {
    margin: 'auto',
  },
  button: {
    backgroundColor: 'black',
    color: 'white',
    width: '100%',
  }
}));


const Cart = (props) => {
  const classes = useStyles();
  const [state, setState] = useState();
  const [subtotal, setSubtotalState] = useState(0);

  useEffect(() => {
    // reset subtotal
    setSubtotalState(0);
    props.items.forEach(item => {
      setState({
        [item.itemSku.id]: item.itemSku.metadata.quantity 
      });
      let total = parseInt((item.itemSku.metadata.quantity) * ( item.itemSku.price / 100 ))
      setSubtotalState(prevState => prevState + total)
    });
  }, [props.items]); 

  const handleChange = event => {
    let updatedItems = props.items.map(item => {
      if (item.itemSku.id === event.target.name) {
        item.itemSku.metadata.quantity = event.target.value
        console.log(`changed quantity ${item.metadata}`)
      }
      return item;
    });
    props.updateItemList(updatedItems);
  }

  const handleRemove = (key) => {
    console.log('test')
    console.log(key)
    let updatedItems = props.items.filter(item => 
      item.itemSku.id !== key 
    )
    console.log(updatedItems)
    props.updateItemList(updatedItems);
  }

  return (
    <Container className={classes.root}>
      <Box className={classes.cartBox}>
        {props.items.map(cartItem => (
          <Card className={classes.card} >
            <Grid xs={12} sm container >
              <Grid item>
                <ButtonBase className={classes.image}>
                  <img className={classes.img} alt="complex" src={cartItem.skuProduct.metadata.imageOne} />
                </ButtonBase>
              </Grid>              
              <Grid item xs container direction="column" spacing={2} className={classes.info}>
                <Grid item xs>
                  <Typography gutterBottom variant="subtitle1">
                    {cartItem.skuProduct.name}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    {`$ ${cartItem.itemSku.price / 100}.00`}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {cartItem.itemSku.attributes.name}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography onClick={() => handleRemove(cartItem.itemSku.id)} variant="body2" style={{ cursor: 'pointer' }}>
                    Remove
                  </Typography>
                </Grid>
              </Grid>
              <Grid item className={classes.formControl}>
                <FormControl >
                  <NativeSelect
                    value={cartItem.itemSku.metadata.quantity}
                    onChange={handleChange}
                    name={cartItem.itemSku.id}          
                  >
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>    
                    <option value={5}>5</option>
                    <option value={6}>6</option>
                    <option value={7}>7</option>
                    <option value={8}>8</option>      
                    <option value={9}>9</option>
                    <option value={10}>10</option>
                    <option value={11}>11</option>
                    <option value={12}>12</option>      
                    <option value={13}>13</option>
                    <option value={14}>14</option>
                    <option value={15}>15</option>
                    <option value={16}>16</option>               
                    <option value={17}>17</option>
                    <option value={18}>18</option>
                    <option value={19}>19</option>    
                    <option value={20}>20</option>
                    <option value={21}>21</option>
                    <option value={22}>22</option>
                    <option value={23}>23</option>      
                    <option value={24}>24</option>
                    <option value={25}>25</option>                                                                          
                  </NativeSelect>
                  <FormHelperText>Quantity</FormHelperText>
                </FormControl>
              </Grid>
            </Grid>
          </Card>
        ))}
      </Box>        
      <Grid xs={12} container direction="column" spacing={2} className={classes.subtotalBox}>
        <Grid item container>
          <Grid item style={{flexGrow: 1}}>
            <Typography>
              SUBTOTAL: 
            </Typography>
          </Grid>
          <Grid item>
            <Typography>
              $ {subtotal}.00
            </Typography>
          </Grid>
        </Grid>
        <Grid item>
          <NavLink style={{height: "100%", textDecoration: 'none', color: 'unset'}} to="/checkout">  
            <Button variant="contained" className={classes.button}>
              CHECKOUT
            </Button>
          </NavLink>
        </Grid>
        <Grid item>
          <NavLink style={{height: "100%", textDecoration: 'none', color: 'unset'}} to="/">  
            <Button variant="contained" style={{backgroundColor: 'white', color: 'black', width: '100%'}}>
              continue shopping
            </Button>
          </NavLink>  
        </Grid>                
      </Grid>
    </Container>     
  );
}

export default connect(
  null,
  { updateItemList }
)(Cart);
