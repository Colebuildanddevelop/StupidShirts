import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { updateItemList } from '../../../redux/actions';

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount() {
    console.log(this.props)
    this.props.items.forEach(item => {
      this.setState({
        [item.id]: item.metadata.quantity 
      });
    });
  }
  handleChange(e) {
    let updatedItems = this.props.items.map(item => {
      if (item.id === e.target.name) {
        item.metadata.quantity = e.target.value
        console.log(`changed quantity ${item.metadata}`)
      }
      return item;
    });
    this.props.updateItemList(updatedItems);
    console.log(this.props);
  }
  render() {
    let cartItems;
    if (this.props.items.length === 0) {
      console.log("props not loaded?")
      cartItems = <h1>Loading</h1>
    } else {
      cartItems = this.props.items.map((item, index) => 
        <div key={item.id.toString()}>
          <li key={item.id.toString()}>{index}</li>
          <li key={item.id.toString()}>{item.id}</li>
          <li key={item.id.toString()}>{item.product}</li>
          <li key={item.id.toString()}>{item.image}</li>
          <li key={item.id.toString()}>{item.price}</li>
          <li key={item.id.toString()}>{item.attributes.name}</li>
          <label key={item.id.toString()}>
            quantity:
              <input type="number" name={item.id} min="1" max="25" ref="myInput" value={item.metadata.quantity} onChange={this.handleChange}></input>
          </label>
          <br/>
        </div>
      );
    }
    return (
      <div>
        <div>
          <ul>
            { cartItems }
          </ul>
        </div>
        <Link to="/checkout">Checkout</Link> 
      </div>
    );  
  }
}

export default connect(
  null,
  { updateItemList }
)(Cart);
