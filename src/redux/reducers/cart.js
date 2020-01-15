const initialState = {
  items: []
};

const cart = (state = initialState, action) => {
  switch(action.type) {
    case 'ADD_TO_CART': {
      return {
        items: [...state.items, action.payload]
      }
    }
    case 'UPDATE_ITEMS': {
      return {
        items: action.payload
      }
    }
    default: {
      return state;
    }
  }
}

export default cart;
