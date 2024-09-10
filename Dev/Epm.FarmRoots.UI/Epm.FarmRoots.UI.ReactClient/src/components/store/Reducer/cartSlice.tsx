import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the shape of the cart item and state
interface CartItem {
  producttypeId: string;
  quantity: number;
  price: number;
}

interface CartState {
  cartObj: Record<string, CartItem>;
  total: {
    quantity: number;
    price: number;
  };
  cartVisibility: boolean;
}

const initialState: CartState = {
  cartObj: {},
  total: { quantity: 0, price: 0 },
  cartVisibility: true,
};

// Create the slice
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      state.cartObj = {
        ...state.cartObj,
        [action.payload.producttypeId]: action.payload,
      };
      state.total = {
        quantity: state.total.quantity + action.payload.quantity,
        price: state.total.price + action.payload.price,
      };
    },
    setCart: (
      state,
      action: PayloadAction<{ cartObj: Record<string, CartItem>; total: { quantity: number; price: number } }>
    ) => {
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

// Export the reducer and actions
export default cartSlice.reducer;
export const { addToCart, setCart, showCart, hideCart, clearCart } = cartSlice.actions;
