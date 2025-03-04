const initialState = {
  cart: [],
};

const cartReducer = (state = initialState, action) => {
  let newState = [...state.cart];
  switch (action.type) {
    case "add_to_cart":
      return {
        ...state,
        cart: [...state.cart, action.payload],
      };
    case "update_quantity":
      const updateQuantity = newState.find(
        (item) => item.id === action.payload.id
      );
      updateQuantity.quantity += action.payload.quantity;
      return {
        ...state,
        cart: newState,
      };
    case "reduce_quantity":
      const reduceQuantity = newState.find(
        (item) => item.id === action.payload.id
      );
      reduceQuantity.quantity -= action.payload.quantity;
      return {
        ...state,
        cart: newState,
      };
    case "add_cart_quantity":
      return {
        ...state,
        cart: newState,
      };
    case "delete_to_cart":
      newState = newState.filter((item) => item.id !== action.payload.id);
      return {
        ...state,
        cart: newState,
      };
    case "deleteAll":
      return {
        ...state,
        cart: [],
      };
    default:
      return state;
  }
};

export default cartReducer;
