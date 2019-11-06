const initialState = {
  field: {
    firstName: '',
    lastName: '',
    address1: '', 
    email: '',
    city: '',
    zip: '',
    state: '',
    country: '',
  }
}

const shipping = (state=initialState, action) => {
  switch(action.type) {
    case 'UPDATE_SHIPPING': {
      return {
        field: action.payload
      }
    } 
    default: {
      return state;
    }
  }
}

export default shipping;