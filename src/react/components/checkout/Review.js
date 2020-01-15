import React from 'react';
// MATERIAL-UI
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import ButtonBase from '@material-ui/core/ButtonBase';

const useStyles = makeStyles(theme => ({
  listItem: {
    padding: theme.spacing(1, 0),
  },
  total: {
    fontWeight: '700',
  },
  title: {
    marginTop: theme.spacing(2),
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
}));

// displays all the data gathered throughout the checkout process
const Review = (props) => {
  const classes = useStyles();
  const addresses = [props.shippingField.address1, props.shippingField.city, props.shippingField.state, props.shippingField.zip, props.shippingField.country];
  let payments = [];
  if (props.stripeToken === undefined) {
    payments = [{name : 'undefined', detail: 'undefined'}]
  } else {
    payments = [
      { name: 'Card type', detail: props.stripeToken.card.brand },
      { name: 'Card holder', detail: `${props.shippingField.firstName} ${props.shippingField.lastName}` },
      { name: 'Card number', detail: `xxxx-xxxx-xxxx-${props.stripeToken.card.last4}` },
      { name: 'Expiry date', detail: `${props.stripeToken.card.exp_month}/${props.stripeToken.card.exp_year}` },
    ];  
  }

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        {props.items.map(cartItem => (
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
            </Grid>
              <Grid item>
                <Typography variant="body2" >
                  x {cartItem.itemSku.metadata.quantity}
                </Typography>
              </Grid>            
          </Grid>  
        ))}
        <ListItem className={classes.listItem}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" className={classes.total}>
            { `$ ${props.orderData.amount / 100}.00` }
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Shipping
          </Typography>
          <Typography gutterBottom>{`${props.shippingField.firstName} ${props.shippingField.lastName}`}</Typography>
          <Typography gutterBottom>{addresses.join(', ')}</Typography>
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Payment details
          </Typography>
          <Grid container>
            {payments.map(payment => (
              <React.Fragment key={payment.name}>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.name}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.detail}</Typography>
                </Grid>
              </React.Fragment>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default Review;
