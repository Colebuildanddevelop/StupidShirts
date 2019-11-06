const initialState = {
  isLoading: true,
  products: [],
  skus: []
}

const product = (state=initialState, action) => {
  switch(action.type) {
    case 'LOAD_PRODUCTS': {
      return {
        isLoading: false,
        products: action.payload,
        skus: state.skus
      }
    } 
    case 'LOAD_SKUS': {
      return {
        isLoading: state.isLoading,
        products: state.products,
        skus: action.payload
      }
    } 
    default: {
      return state;
    }
  }
}

export default product;