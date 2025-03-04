export const addToCart = (id, product, quantity) => {
  return {
    type: "add_to_cart",
    payload: { id, quantity: 1, product },
  };
};

export const updateQuantity = (id, quantity = 1) => {
  return {
    type: "update_quantity",
    payload: { id, quantity },
  };
};

export const reduceQuantity = (id, quantity = 1) => {
  return {
    type: "reduce_quantity",
    payload: { id, quantity },
  };
};

export const addCartQuantity = (id, quantity, product) => {
  return {
    type: "add_cart_quantity",
    payload: { id, product, quantity },
  };
};

export const deleteToCart = (id) => {
  return {
    type: "delete_to_cart",
    payload: { id },
  };
};

export const deleteAll = () => {
  return{
    type:'deleteAll'
  }
}
