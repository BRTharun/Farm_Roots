import { createSlice } from "@reduxjs/toolkit";
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartObj: {},
    total: { quantity: 0, price: 0 },
    cartVisibility: true,
  },
  reducers: {
    addToCart: (state, action) => {
      if (state.cartObj[producttypeId]) {
        state.cartObj[producttypeId].quantity += quantity;
        state.cartObj[producttypeId].price += price;
      } else {
        state.cartObj[producttypeId] = action.payload;
      }

      // Update the total quantity and price
      state.total.quantity += quantity;
      state.total.price += price;
    },
    setCart: (state, action) => {
      state.cartObj = action.payload.cartObj;
      state.total = action.payload.total;
    },
    showCart: (state) => {
      state.cartVisibility = true;
    },
    hideCart: (state) => {
      state.cartVisibility = false;
    },
    clearCart: () => {
      return {
        cartObj: {},
        total: { quantity: 0, price: 0 },
        cartVisibility: false,
      };
    },
  },
});
export default cartSlice;
export const { addToCart, setCart, showCart, hideCart, clearCart } =
  cartSlice.actions;
