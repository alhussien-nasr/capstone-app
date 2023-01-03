import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  ls: [],
  category: [],
  cart: [],
  userInfo: {},
  address: [],
  wishList: [],
};

export const EqSlice = createSlice({
  name: 'equipment',
  initialState,
  reducers: {
    setUserAccount: (state, action) => {
      const {cart} = state;
      cart.id = action.payload;
    },
    addToBag: (state, action) => {
      const {cart} = state;

      const item = cart.find(item => item._id == action.payload._id);
      if (item) {
        item.qty = item.qty + action.payload.qty;
      } else {
        cart.push(action.payload);
      }
    },
    addQty: (state, action) => {
      const {cart} = state;
      cart.filter(item => item._id == action.payload._id)[0].qty++;
    },
    reduceQty: (state, action) => {
      const {cart} = state;
      cart.filter(item => item._id == action.payload._id)[0].qty--;
    },

    remove: (state, action) => {
      const {cart} = state;
      cart = cart.filter(item => item._id != action.payload._id);
    },
    addTowishList: (state, action) => {
      const item = state.wishList.find(item => item._id == action.payload._id);
      if (item) {
        state.wishList = state.wishList.filter(
          item => item._id != action.payload._id,
        );
      } else {
        state.wishList.push(action.payload);
      }
    },
    removeFromWihList: (state, action) => {
      state.wishList = state.wishList.filter(
        item => item._id != action.payload._id,
      );
    },
    setConfirm: (state, action) => {
      state.userInfo = action.payload;
    },
    logout: state => {
      const {cart, userInfo} = state;
      userInfo.token = '';
    },
    getCatt: (state, action) => {
      state.category = action.payload;
    },
    getproduct: (state, action) => {
      state.ls = action.payload;
    },
    cleanList: state => {
      state.ls = [];
    },
    loadMoreProduct: (state, action) => {
      state.ls.push(...action.payload);
    },
    setCart: (state, action) => {
      state.cart = action.payload;
    },
    setAddress: (state, action) => {
      state.address = action.payload;
    },
  },
});

export const {
  loadMoreProduct,
  setUserAccount,
  addToBag,
  addQty,
  reduceQty,
  remove,
  addTowishList,
  removeFromWihList,
  setConfirm,
  logout,
  getCatt,
  getproduct,
  cleanList,
  setCart,
  setAddress,
} = EqSlice.actions;

export default EqSlice.reducer;
