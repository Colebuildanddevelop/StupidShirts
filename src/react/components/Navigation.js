import React, {Component} from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { loadProducts } from '../../redux/actions';
import { loadSkus } from '../../redux/actions';
// COMPONENTS
import NavBar from './NavBar';
import ProductDetails from './ProductDetails';
import ProductDisplay from './ProductDisplay';
import MyStoreCheckout from './checkout/MyStoreCheckout';
import Footer from './Footer';
import Cart from './Cart';
import Loading from './Loading'

// MATERIAL-UI
import CssBaseline from '@material-ui/core/CssBaseline';

class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  componentDidMount() {
    this.props.loadProducts()
      .then(res => console.log(res))
      .then(err => console.log(err))
    this.props.loadSkus()
      .then(res => console.log(res))
      .then(err => console.log(err))
  }

  render() {
    if (this.props.isLoading === true) {
      return <Loading/>
    } else {
      return (
        <React.Fragment>
          <CssBaseline />
          <NavBar/>
          <Switch>    
            <Route 
              exact path="/"
              render={() => <ProductDisplay products={this.props.products.data}/>}
            />
            <Route
              path="/shirt_:id" 
              render={({match}) => <ProductDetails skus={this.props.skus.data} product={this.props.products.data[match.params.id]} items={this.props.items}/>} 
            />
            <Route
              path="/cart"
              render={() => <Cart items={this.props.items} products={this.props.products.data} />}
            />
            <Route
              path="/checkout"
              render={() =>
                <MyStoreCheckout
                  items={this.props.items} 
                  products={this.props.products.data} 
                  shippingField={this.props.shippingField}
                />
              }
            />
          </Switch>
          <Footer/>
        </React.Fragment>
      );
    }
  }
};

const mapStateToProps = (state) => {
  return {
    products: state.product.products,
    shippingField: state.shipping.field,
    skus: state.product.skus,
    items: state.cart.items,
    isLoading: state.product.isLoading
  };
};

export default connect(
  mapStateToProps,
  { loadProducts, loadSkus }
)(Navigation);

