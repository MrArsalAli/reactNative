import { Product } from "@/constants/interface";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

// First, create the thunk
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (thunkAPI) => {
    const response = await axios.get("https://dummyjson.com/products");
    console.log("response.data==>", response);
    return response.data.products;
  }
);

interface ProductsState {
  products: Product[];
  status: "idle" | "pending" | "succeeded" | "failed";
}

const initialState: ProductsState = {
  products: [],
  status: "idle",
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state, action) => {
      // Add user to the state array
      state.status = "pending";
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.products = action.payload;
      state.status = "succeeded";
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.products = [];
      state.status = "failed";
    });
  },
});

export const {} = productSlice.actions;

export default productSlice.reducer;

// export interface ThemeState {
//   theme: "light" | "dark";
// }

// const initialState: ThemeState = {
//   theme: "light",
// };

// export const themeSlice = createSlice({
//   name: "theme",
//   initialState,
//   reducers: {
//     changeTheme: (state) => {
//       state.theme = state.theme == "light" ? "dark" : "light";
//     },
//   },
// });

// export const { changeTheme } = themeSlice.actions;

// export default themeSlice.reducer;
