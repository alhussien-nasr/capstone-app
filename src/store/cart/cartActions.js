import { CART_TYPES } from "./cartTypes";

const addCartItem = (cartItems, productToAdd) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id
  );

  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }

  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const removeCartItem = (cartItems, cartItemToRemove) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === cartItemToRemove.id
  );

  if (existingCartItem.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
  }

  return cartItems.map((cartItem) =>
    cartItem.id === cartItemToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};

export const addItemToCart = (state, productToAdd) => {
  const cartItems = addCartItem(state, productToAdd);
  const cartTotal = cartItems.reduce(
    (total, current) => total + current.price,
    0
  );
  const cartCount = cartItems.reduce(
    (total, current) => total + current.quantity,
    0
  );
  return {
    type: CART_TYPES.SET_CART_ITEM,
    payload: { cartItems, cartTotal, cartCount },
  };
};

export const removeItemfromCart = (state, cartItemToRemove) => {
  const cartItems = removeCartItem(state, cartItemToRemove);
  const cartTotal = cartItems.reduce(
    (total, current) => total + current.price,
    0
  );
  const cartCount = cartItems.reduce(
    (total, current) => total + current.quantity,
    0
  );

  return {
    type: CART_TYPES.SET_CART_ITEM,
    payload: { cartItems, cartTotal, cartCount },
  };
};

export const clearItem = (state, id) => {
  const cartItems = state.filter((item) => item.id !== id);
  const cartTotal = cartItems.reduce(
    (total, current) => total + current.price,
    0
  );
  const cartCount = cartItems.reduce(
    (total, current) => total + current.quantity,
    0
  );

  return {
    type: CART_TYPES.SET_CART_ITEM,
    payload: { cartItems, cartTotal, cartCount },
  };
};

export const toggleDropdown = () => {
  return { type: "TOOGLE_CART" };
};
