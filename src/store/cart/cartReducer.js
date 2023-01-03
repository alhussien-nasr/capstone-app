import { CART_TYPES } from "./cartTypes";

const initalState = {
  dropdown: false,
  cartItems: [],
  cartCount: 0,
  cartTotal: 0,
};

export const cartReducer = (state = initalState, action = {}) => {
  const { type, payload } = action;
  switch (type) {
    case CART_TYPES.TOOGLE_CART:
      return { ...state, dropdown: !state.dropdown };

    case CART_TYPES.SET_CART_ITEM:
      return { ...state, ...payload };
    default:
      return state;
  }
};
