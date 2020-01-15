import React, { useState, useEffect } from 'react';
import { CardNumberElement, CardExpiryElement, CardCvcElement } from 'react-stripe-elements';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

// styles taken from stripe react elements https://github.com/stripe/react-stripe-elements/blob/master/demo/demo/index.js
const createOptions = (padding) => {
  return {
    style: {
      base: {        
        fontSize: '1rem',
        color: 'black',
        letterSpacing: '0.025em',
        fontFamily: 'Source Code Pro, monospace',
        '::placeholder': {
          color: '#aab7c4',
        },
        ...(padding ? {padding} : {}),
      },
      invalid: {
        color: '#9e2146',
      },
    },
  };
};

// PCI compliant payment form, using react-stripe-elements
const PaymentForm = (props) => {
  const handleReady = () => {
    props.changeLoading(false)
    console.log('[ready]');
  };
  return (    
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Payment method
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Typography variant="h9">
            Card Number *
          </Typography>
          <Typography style={{borderBottom: 'solid grey .025em', paddingBottom: '7px', paddingTop: '7px'}}>
            <CardNumberElement
              {...createOptions()}          
              onReady={handleReady}              
            />
          </Typography>
        </Grid>  
        <Grid item xs={12} md={4}>
          <Typography variant="h9">
            Expiration date *
          </Typography>
          <Typography style={{borderBottom: 'solid grey .025em', paddingBottom: '7px', paddingTop: '7px'}}>   
            <CardExpiryElement
              {...createOptions()}              
              onReady={handleReady}              
            />
          </Typography>       
        </Grid> 
        <Grid item xs={12} md={4}>
          <Typography variant="h9">
            CVC *
          </Typography>
          <Typography style={{borderBottom: 'solid grey .025em', paddingBottom: '7px', paddingTop: '7px'}}>        
            <CardCvcElement              
              onReady={handleReady}
              {...createOptions()}
            />
          </Typography>    
        </Grid>                   
      </Grid>
    </React.Fragment> 
  );
};

export default PaymentForm;