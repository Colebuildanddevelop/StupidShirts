import React, {Component} from 'react';
import {CardElement, injectStripe} from 'react-stripe-elements';
import { Link } from 'react-router-dom';

class CheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      skuList: [],
      orderCreated: false,
      name: "",
      email: "",
      address: "",
      city: "",
      state: "",
      zip: "",
      order: {}
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlePay = this.handlePay.bind(this);
    this.goBack = this.goBack.bind(this);
  }

  componentDidMount() {
    this.props.items.forEach((item) => {
      let skuObj = {
        type: 'sku',
        parent: item.id,
        quantity: item.metadata.quantity
      }
      this.setState(state => ({
        skuList: [...state.skuList, skuObj]
      }));
    });
  }
  goBack() {
    this.setState({
      orderCreated: false
    });
  }
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
    console.log(this.state);
  }

  async handleSubmit() {
    // clean up to es6 
    await fetch('/api/create-order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        items: this.state.skuList,
        shipping: {
          name: this.state.name,
          address: {
            line1: this.state.address,
            city: this.state.city,
            state: this.state._state,
            postal_code: this.state.zip
          }
        },
        email: this.state.email
      })
    })
    .then(result => {
      console.log(result);
      return result.json();
    })
    .then(data => {
      this.setState({
        orderCreated: true,
        order: data
      });
    });
    console.log(this.state);
  }

  async handlePay() {
    let {token} = await this.props.stripe.createToken();
    let response = await fetch("/api/pay-order", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        orderId: this.state.order.id,
        token: token.id
      })
    })
    console.log(response.json());
  }

  render() {
    if (!this.state.orderCreated) {
      return (
        <Form
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          name={this.state.name}
          email={this.state.email}
          address={this.state.address}
          city={this.state.city}
          state={this.state.state}
          zip={this.state.zip} 
        />
      );
    } else {
      return (
        <OrderDetails
          order={this.state.order}
          handlePay={this.handlePay}
          goBack={this.goBack}
        />
      );
    }
  }
}

const Form = (props) => {
  return (
    <div className="checkout">
      <div>
        <form>
          <label>
            Name:
            <input type="text" name="name" onChange={(e) => {props.handleChange(e)}} value={props.name} />
          </label>
          <label>
            Email:
            <input type="text" name="email" onChange={(e) => {props.handleChange(e)}} value={props.email} />
          </label>  
          <label>
            Address:
            <input type="text" name="address" onChange={(e) => {props.handleChange(e)}} value={props.address} />
          </label>
          <label>
            City:
            <input type="text" name="city" onChange={(e) => {props.handleChange(e)}} value={props.city} />
          </label> 
          <label>
            State:
            <input type="text" name="state" onChange={(e) => {props.handleChange(e)}} value={props.state} />
          </label>
          <label>
            Zip:
            <input type="text" name="zip" onChange={(e) => {props.handleChange(e)}} value={props.zip} />
          </label>          
        </form>
      </div>
      <button onClick={props.handleSubmit}>Purchase</button>
      <Link to="/cart">
        <button>Back</button>
      </Link>
    </div>
  )
}

const OrderDetails = (props) => {
  // TODO: add edit button that cancels order and routes to previous step 
  const amount = props.order.amount / 100;
  return (
    <div>
      <p>Total: {amount}</p>
      <p>Email: {props.order.email}</p>      
      <p>City: {props.order.shipping.address.city}</p>
      <p>State: {props.order.shipping.address.state}</p>
      <p>City: {props.order.shipping.address.city}</p>
      <p>City: {props.order.shipping.address.city}</p>
      <p>Method of shipping: {props.order.selected_shipping_method}</p>
      <CardElement/>
      <button onClick={props.handlePay}>Pay</button>
      <button onClick={props.goBack}>Back</button>
    </div>
  )
}


export default injectStripe(CheckoutForm);