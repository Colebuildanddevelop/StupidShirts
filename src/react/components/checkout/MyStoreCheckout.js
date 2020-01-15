import React from 'react';
import {Elements, StripeProvider} from 'react-stripe-elements';
// COMPONENTS
import Checkout from './Checkout';

// higher order component, injects the stripe api, for a custom pci compliant checkout
const MyStoreCheckout = (props) => {
  return (
    <div>
      <StripeProvider apiKey="pk_test_Kd1abTnAdSYMp27toMVf69OH00m8HrsbLN">
        <div>
          <Elements>
            <Checkout
              items={props.items}
              shippingField={props.shippingField}            
            />
          </Elements>
        </div>
      </StripeProvider>
    </div>
  );
}

export default MyStoreCheckout;