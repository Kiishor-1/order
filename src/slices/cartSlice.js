
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { CART_ENDPOINTS } from '../services/api';
import toast from 'react-hot-toast';

const initialState = {
  items: [],
  totalPrice: 0,
  orderDetail: [],
  loading: false,
  error: null,
};

// Utility function to get headers
const getHeaders = (token) => ({
  Authorization: `Bearer ${token}`,
  Accept: 'application/json',
});

export const fetchCart = createAsyncThunk('cart/fetchCart', async (_, { getState, rejectWithValue }) => {
  const token = getState().auth.token;
  try {
    const response = await axios.get(CART_ENDPOINTS.FETCH_CART, { headers: getHeaders(token) });
    // console.log('rrrrespone',response)
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || 'Failed to fetch cart');
  }
});

export const addItemToCart = createAsyncThunk(
  "cart/addItemToCart",
  async (item, { getState, rejectWithValue }) => {
    const token = getState().auth.token; // Get token from state
    try {
      const response = await axios.post(CART_ENDPOINTS.ADD_TO_CART, item, {
        headers: getHeaders(token),
      });

      if (!response.data?.success) {
        toast.error(response.data?.error || "An error occurred");
        return rejectWithValue(response.data?.error);
      }

      return response.data?.item;
    } catch (error) {
      if (error.response) {
        const status = error.response.status;

        if (status === 401) {
          toast.error("Unauthorized: Please log in to continue.");
        } else if (status === 403) {
          toast.error("Forbidden: You do not have permission to perform this action.");
        } else if (status === 500) {
          toast.error("Server error: Please try again later.");
        } else {
          toast.error(error.response.data?.error || "Failed to add item to cart");
        }

        return rejectWithValue(error.response.data || "An error occurred");
      } else {
        toast.error("Network error: Please check your connection.");
        return rejectWithValue("Network error: Please check your connection.");
      }
    }
  }
);


export const removeItemFromCart = createAsyncThunk('cart/removeItemFromCart', async (data, { getState, rejectWithValue }) => {
  const token = getState().auth.token;
  const itemId = data.id;
  try {
    const response = await axios.delete(CART_ENDPOINTS.REMOVE_FROM_CART(itemId), { headers: getHeaders(token) });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || 'Failed to remove item from cart');
  }
});

export const updateCartQuantity = createAsyncThunk(
  'cart/updateCartQuantity',
  async ({ itemId, quantity }, { getState, rejectWithValue }) => {
    const token = getState().auth.token;
    try {
      const response = await axios.put(
        CART_ENDPOINTS.UPDATE_CART_QUANTITY(itemId),
        { quantity },
        { headers: getHeaders(token) }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to update cart quantity');
    }
  }
);

export const clearCart = createAsyncThunk('cart/clearCart', async (_, { getState, rejectWithValue }) => {
  const token = getState().auth.token;
  try {
    const response = await axios.get(CART_ENDPOINTS.CLEAR_CART, { headers: getHeaders(token) });
    console.log('token',token)
    console.log('res',response)
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || 'Failed to clear cart');
  }
});


export const addSharedCartToCart = createAsyncThunk(
  'cart/addSharedCartToCart',
  async (sharedCart, { getState, rejectWithValue }) => {
    console.log(sharedCart)
    try {
      // Get current cart items from state
      const currentCartItems = getState().cart.items;
      console.log('currentCartItems')

      // Filter out items that already exist in the current cart
      const newItems = sharedCart.items.filter(
        (sharedItem) =>
          !currentCartItems.some((cartItem) => cartItem.foodItem._id === sharedItem.foodItem._id)
      );

      // Return filtered shared cart
      return { items: newItems };
    } catch (error) {
      console.error('Error in addSharedCartToCart:', error);
      return rejectWithValue('Failed to add shared cart to cart');
    }
  }
);


const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Cart
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload?.cart;
        state.totalPrice = action.payload.totalPrice;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Add Item to Cart
      .addCase(addItemToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addItemToCart.fulfilled, (state, action) => {
        state.loading = false;
        const existingItem = state.items.find((item) => item.foodItem._id === action.payload.foodItem._id);
        if (existingItem) {
          existingItem.quantity += 1;
        } else {
          state.items.push(action.payload);
        }
        state.totalPrice += action.payload?.foodItem?.price;
      })

      .addCase(addItemToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Remove Item from Cart
      .addCase(removeItemFromCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeItemFromCart.fulfilled, (state, action) => {
        state.loading = false;
        const { itemId, quantity } = action.payload;

        if (quantity > 0) {
          const existingItem = state.items.find(item => item.foodItem?._id === itemId);
          if (existingItem) {
            existingItem.quantity = quantity;
          }
        } else {
          state.items = state.items.filter(item => item.foodItem?._id !== itemId);
        }

        const removedItem = state.items.find(item => item.foodItem?._id === itemId);
        if (removedItem) {
          state.totalPrice -= removedItem.foodItem.price * removedItem.quantity;
        }
      })
      .addCase(removeItemFromCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update Cart Quantity
      .addCase(updateCartQuantity.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCartQuantity.fulfilled, (state, action) => {
        state.loading = false;
        const item = state.items.find((item) => item.foodItem._id === action.payload.foodItem._id);
        if (item) {
          const priceDifference = (action.payload.quantity - item.quantity) * item.foodItem.price;
          item.quantity = action.payload.quantity;
          state.totalPrice += priceDifference;
        }
      })

      .addCase(updateCartQuantity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(clearCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(clearCart.fulfilled, (state, action) => {
        console.log('Clearing cart. Items:', state.items);
        state.loading = false;
    
        // Ensure only unique items are stored in orderDetail
        const uniqueItemsMap = new Map();
        state.items.forEach(item => {
            uniqueItemsMap.set(item.foodItem?._id || item.foodItem.toString(), item); // Use foodItem as a unique key
        });
        state.orderDetail = Array.from(uniqueItemsMap.values()); // Extract unique items
    
        state.items = [];
        state.totalPrice = 0;
    })       
      .addCase(clearCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addSharedCartToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addSharedCartToCart.fulfilled, (state, action) => {
        state.loading = false;

        // Add new items to the cart
        state.items.push(...action.payload.items);

        // Update the total price for new items only
        const newItemsTotal = action.payload.items.reduce(
          (total, item) => total + item.foodItem.price * item.quantity,
          0
        );
        state.totalPrice += newItemsTotal;
      })
      .addCase(addSharedCartToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default cartSlice.reducer;


