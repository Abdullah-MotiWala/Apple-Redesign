import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface CartState {
  item: Product[];
}

const initialState: CartState = {
  item: []
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state: CartState, action: PayloadAction<Product>) => {
      state.item = [...state.item, action.payload];
    },
    removeFromCart: (
      state: CartState,
      action: PayloadAction<{ id: string }>
    ) => {
      const index = state.item.findIndex(
        (item) => item._id === action.payload.id
      );

      let tempCart = [...state.item];
      //   checking if item found in cart items
      if (index >= 0) {
        tempCart.splice(index, 1);
      } else {
        console.log(`Item not found`);
      }

      state.item = tempCart;
    },
    clearCart: (state: CartState) => {
      state.item = [];
    }
  }
});

// Action creators are generated for each case reducer function
export const { addToCart, clearCart, removeFromCart } = cartSlice.actions;

// Selectors (We will use these for reterieving data in useSelector to make it obvious)
export const selectCartItems = (state: RootState) => state.cart.item;
export const selectCartItemWithIds = (state: RootState, id: string) =>
  state.cart.item.filter((item: Product) => item._id === id);

export const selectCartTotal = (state: RootState) =>
  state.cart.item.reduce(
    (total: number, item: Product) => total + item.price,
    0
  );
export default cartSlice.reducer;
