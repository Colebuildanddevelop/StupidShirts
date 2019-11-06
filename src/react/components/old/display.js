import React, {Component} from 'react';
import { connect } from 'react-redux';
import { addToCart } from '../../../redux/actions';

class ProductDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loadedState: false,
      skuOne: {},
      skuTwo: {},
      skuThree: {},
      selectedSku: {}
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  async componentDidMount() {
    console.log(this.props);
    // 

    this.setState({
      loadedState: true,
      selectedSku: this.props.products.data[2],
      skuSmall: this.props.products.data[2],
      skuMedium: this.props.products.data[1],
      skuLarge: this.props.products.data[0]
    });
    console.log(this.state.skuOne);
    console.log(this.state.skuOne.attributes);
  }
  findSku(searchSku) {

      
  }
  handleChange(e) {
    switch(e.target.value) {
      case 'small':
        // set state of selected sku to the store
        let sku = this.props.skus.map(sku => {
          if ((sku.product === this.props.product.id) && (sku.attributes.name === e.target.value)) {
            return sku;
          }
        })

        this.setState(state => ({
          selectedSku: sku
        }));
        console.log(this.state.selectedSku);
        break;
      case 'medium':
        this.setState(state => ({
          selectedSku: state.skuMedium
        }));
        console.log(this.state.selectedSku);
        break;
      case 'large':
        this.setState(state => ({
          selectedSku: state.skuLarge
        }));
        console.log(this.state.selectedSku);
        break;   
      default:
        break;     
    }
    console.log(this.props);
  }

  handleClick() {

    // so far in this function we are checking to see if a sku exist, if so add if so dont add.
    if (this.props.items.length !== 0) {
      let skus = this.props.items.map((item, index) => {
        return item.sku.id;
      });
      console.log(skus);
      let skuExist = skus.includes(this.state.selectedSku.id);
      if (!skuExist) {
        let payload = {
          skuId: this.state.selectedSku.id,
          sku: this.state.selectedSku
        }
        this.props.addToCart(payload);
        console.log("added to cart");          
      } else {
        console.log("cant add same sku");
      }
    } else {
      let payload = {
        skuId: this.state.selectedSku.id,
        sku: this.state.selectedSku
      }
      this.props.addToCart(payload);
      console.log("added to cart");  
    }
  }

  render() {
    if (this.state.loadedState === false) {
      return (
        <h1>loading</h1>
      )
    } else {
      return (
        <div className="container">
          <img src={this.props.product.images[0]} className="product" />
          <h2>{this.props.product.name}</h2>
          <h3>{this.props.product.price}</h3>
          <select onChange={this.handleChange}>
            <option value={this.state.skuSmall.attributes.name}>S</option>
            <option value={this.state.skuMedium.attributes.name}>M</option>
            <option value={this.state.skuLarge.attributes.name}>L</option>
          </select>
          <button onClick={this.handleClick}>ADD TO CART</button>
          <p>{this.props.product.caption}</p>
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return { items: state.cart.items };
};

export default connect(
  mapStateToProps,
  { addToCart }
)(ProductDetails);

