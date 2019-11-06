export const addToCart = (product) => ({
  type: 'ADD_TO_CART',
  payload: product
});

export const updateItemList = (updatedItems) => ({
  type: 'UPDATE_ITEMS',
  payload: updatedItems
});

export const updateShipping = (shippingInfo) => ({
  type: 'UPDATE_SHIPPING',
  payload: shippingInfo
});



export const loadProducts = () => {
  return (dispatch) => {
    return fetch('/api/products')
      .then(
        res => res.json(),
        error => console.log(error)
      )
      .then(response => {
        dispatch({
          type: 'LOAD_PRODUCTS',
          payload: response 
        })
      })
  }
}

export const loadSkus = () => {
  return (dispatch) => {
    return fetch("/api/list-skus")
      .then(
        res => res.json(),
        error => console.log(error)
      )
      .then(response => {
        dispatch({
          type: 'LOAD_SKUS',
          payload: response 
        })
      })
  }  
}

