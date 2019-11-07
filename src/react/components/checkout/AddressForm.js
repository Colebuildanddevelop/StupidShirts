import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

export default function AddressForm(props) {
  

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Shipping information
      </Typography>      
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            required
            
            
            value={props.shippingField.email}
            onChange={props.handleChange}                              
            id="email"
            name="email"
            label="Email"
            fullWidth
            autoComplete="email"
          />
        </Grid>        
        <Grid item xs={12} sm={6}>
          <TextField
            required
            value={props.shippingField.firstName}
            onChange={props.handleChange}
            id="firstName"
            name="firstName"
            label="First name"
            fullWidth
            autoComplete="fname"            
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            value={props.shippingField.lastName}
            onChange={props.handleChange}          
            required                        
            id="lastName"
            name="lastName"
            label="Last name"
            fullWidth
            autoComplete="lname"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            value={props.shippingField.address1}
            onChange={props.handleChange}          
            required                        
            id="address1"
            name="address1"
            label="Address line 1"
            fullWidth
            autoComplete="billing address-line1"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            value={props.shippingField.city}
            onChange={props.handleChange}          
            required                      
            id="city"
            name="city"
            label="City"
            fullWidth
            autoComplete="billing address-level2"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField required id="state" name="state" value={props.shippingField.state} label="State/Province/Region" fullWidth onChange={props.handleChange} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            value={props.shippingField.zip}
            onChange={props.handleChange}          
            required                       
            id="zip"
            name="zip"
            label="Zip / Postal code"
            fullWidth
            autoComplete="billing postal-code"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            value={props.shippingField.country}
            onChange={props.handleChange}          
            required
            id="country"
            name="country"
            label="Country"
            fullWidth
            autoComplete="billing country"
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}