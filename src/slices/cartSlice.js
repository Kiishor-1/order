import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { CART_ENDPOINTS } from '../services/api';
import toast from 'react-hot-toast';

const loadCartFromLocalStorage = () => {
  const cart = localStorage.getItem('cart');
  return cart ? JSON.parse(cart) : { items: [], totalPrice: 0 };
};

const saveCartToLocalStorage = (cart) => {
  localStorage.setItem('cart', JSON.stringify(cart));
};

const findCartItem = (cartItems, itemId) =>
  cartItems.find((item) => item.foodItem._id === itemId);

const calculatePriceDifference = (item, newQuantity) =>
  (newQuantity - item.quantity) * item.foodItem?.price;

const updateLocalCartItem = (cart, itemId, newQuantity) => {
  const item = findCartItem(cart.items, itemId);
  if (item) {
    const priceDifference = calculatePriceDifference(item, newQuantity);
    item.quantity = newQuantity;
    cart.totalPrice += priceDifference;
    saveCartToLocalStorage(cart);
  }
  return cart;
};


const initialState = {
  items: [],
  totalPrice: 0,
  orderDetail: [],
  loading: false,
  error: null,
};

const getHeaders = (token) => ({
  Authorization: `Bearer ${token}`,
  Accept: 'application/json',
});

export const fetchCart = createAsyncThunk('cart/fetchCart', async (_, { getState, rejectWithValue }) => {
  const token = getState().auth.token;
  if (!token) {
    const localCart = loadCartFromLocalStorage();
    return { cart: localCart.items, totalPrice: localCart.totalPrice };
  }

  try {
    const response = await axios.get(CART_ENDPOINTS.FETCH_CART, { headers: getHeaders(token) });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || 'Failed to fetch cart');
  }
});


export const addItemToCart = createAsyncThunk(
  'cart/addItemToCart',
  async (foodItem, { getState, rejectWithValue }) => {
    const token = getState().auth.token;

    if (!token) {
      const localCart = loadCartFromLocalStorage();
      const existingItem = localCart.items.find(i => i.foodItem._id === foodItem._id);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        localCart.items.push({ foodItem, quantity: 1 });
      }

      localCart.totalPrice += foodItem.price;
      saveCartToLocalStorage(localCart);

      return { items: [...localCart.items], totalPrice: localCart.totalPrice };
    }

    try {
      const response = await axios.post(
        CART_ENDPOINTS.ADD_TO_CART,
        { _id: foodItem._id },
        { headers: getHeaders(token) }
      );

      if (!response.data?.success) {
        toast.error(response.data?.error || 'An error occurred');
        return rejectWithValue(response.data?.error);
      }

      const returnedItem = response.data?.item;
      const stateItems = [...getState().cart.items];

      let updatedItems;

      const existingItem = stateItems.find(item => item.foodItem._id === returnedItem.foodItem._id);
      if (existingItem) {
        updatedItems = stateItems.map(item =>
          item.foodItem._id === returnedItem.foodItem._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        updatedItems = [...stateItems, { ...returnedItem, quantity: 1 }];
      }

      const totalPrice = updatedItems.reduce((sum, item) => sum + item.foodItem.price * item.quantity, 0);

      return { items: updatedItems, totalPrice };
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to add item to cart');
      return rejectWithValue(error.response?.data || 'An error occurred');
    }
  }
);




export const removeItemFromCart = createAsyncThunk(
  'cart/removeItemFromCart',
  async ({ id: itemId }, { getState, rejectWithValue }) => {
    const token = getState().auth.token;
    const isUserLoggedIn = !!token;

    if (!isUserLoggedIn) {
      try {
        const localCart = loadCartFromLocalStorage();
        const itemToRemove = localCart.items.find((item) => item.foodItem._id === itemId);

        if (!itemToRemove) {
          return rejectWithValue('Item not found in cart');
        }

        const updatedItems = localCart.items
          .map((item) => {
            if (item.foodItem._id === itemId) {
              if (item.quantity - 1 <= 0) {
                return null; 
              }
              return {
                ...item,
                quantity: item.quantity - 1,
              };
            }
            return item; 
          })
          .filter(Boolean);

        const priceDifference = itemToRemove.foodItem.price;

        localCart.items = updatedItems;
        localCart.totalPrice -= priceDifference;

        saveCartToLocalStorage(localCart);

        return { items: localCart.items, totalPrice: localCart.totalPrice };
      } catch (error) {
        console.error('Error in removeItemFromCart:', error);
        return rejectWithValue('Failed to remove/update item in cart');
      }
    }

    try {
      const response = await axios.delete(
        CART_ENDPOINTS.REMOVE_FROM_CART(itemId),
        { headers: getHeaders(token) } 
      );
      return response.data?.item;
    } catch (error) {
      console.error('Error removing item:', error.response?.data || error);
      return rejectWithValue(error.response?.data || 'Failed to remove item');
    }

  }
);


export const clearCart = createAsyncThunk('cart/clearCart', async (_, { getState, rejectWithValue }) => {
  const token = getState().auth.token;

  if (!token) {
    localStorage.removeItem('cart');
    return { items: [], totalPrice: 0 };
  }

  try {
    const response = await axios.get(CART_ENDPOINTS.CLEAR_CART, { headers: getHeaders(token) });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || 'Failed to clear cart');
  }
});


export const addSharedCartToCart = createAsyncThunk(
  'cart/addSharedCartToCart',
  async (sharedCart, { getState, rejectWithValue }) => {
    try {
      const currentCartItems = getState().cart.items;

      const newItems = sharedCart.items.filter(
        (sharedItem) =>
          !currentCartItems.some((cartItem) => cartItem.foodItem._id === sharedItem.foodItem._id)
      );
      const totalPriceForNewItems = newItems.reduce(
        (total, item) => total + item.foodItem.price * item.quantity,
        0
      );

      return { newItems, totalPriceForNewItems };
    } catch (error) {
      console.error('Error in addSharedCartToCart:', error);
      return rejectWithValue('Failed to add shared cart to cart');
    }
  }
);



export const updateCartQuantity = createAsyncThunk(
  'cart/updateCartQuantity',
  async ({ itemId, quantity }, { getState, rejectWithValue }) => {
    const token = getState().auth.token;

    if (!token) {
      try {
        const localCart = loadCartFromLocalStorage();
        const updatedCart = updateLocalCartItem(localCart, itemId, quantity);
        return { itemId, quantity, totalPrice: updatedCart.totalPrice };
      } catch (error) {
        console.error('Error updating cart locally:', error);
        return rejectWithValue('Failed to update cart locally');
      }
    }

    try {
      const response = await axios.put(
        CART_ENDPOINTS.UPDATE_CART_QUANTITY(itemId),
        { quantity },
        { headers: getHeaders(token) }
      );
      return response.data?.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to update cart');
    }
  }
);


const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
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
      .addCase(addItemToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addItemToCart.fulfilled, (state, { payload }) => {
        state.items = [...payload.items]; // Ensure new reference
        state.totalPrice = payload.totalPrice;
        state.loading = false;
      })      
      .addCase(addItemToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(removeItemFromCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeItemFromCart.fulfilled, (state, action) => {
        const { items, totalPrice, itemId } = action.payload;

        if (items && totalPrice !== undefined) {
          state.items = items;
          state.totalPrice = totalPrice;
        } else if (itemId) {
          const itemIndex = state.items.findIndex((item) => item.foodItem._id === itemId);
          if (itemIndex > -1) {
            const item = state.items[itemIndex];
            if (item.quantity - 1 <= 0) {
              state.items.splice(itemIndex, 1);
              state.totalPrice -= item.foodItem.price;
            } else {
              item.quantity -= 1;
              state.totalPrice -= item.foodItem.price;
            }
          }
        }
      })
      .addCase(removeItemFromCart.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(clearCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(clearCart.fulfilled, (state, action) => {
        console.log('Clearing cart. Items:', state.items);
        state.loading = false;

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

        action.payload.newItems.forEach((newItem) => {
          const existingItem = state.items.find(item => item.foodItem._id === newItem.foodItem._id);
          if (existingItem) {
            existingItem.quantity += newItem.quantity;
          } else {
            state.items.push(newItem);
          }
        });

        state.totalPrice += action.payload.totalPriceForNewItems;
      })
      .addCase(addSharedCartToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      }).addCase(updateCartQuantity.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCartQuantity.fulfilled, (state, action) => {
        state.loading = false;

        if (action.payload?.itemId && action.payload?.quantity !== undefined) {
          const item = state.items.find((item) => item.foodItem._id === action.payload.itemId);
          if (item) {
            const quantityDifference = action.payload.quantity - item.quantity;
            item.quantity = action.payload.quantity;
            state.totalPrice += quantityDifference * item.foodItem.price;
          }
        } else if (action.payload?.data) {
          state.items = action.payload.data.items;
          state.totalPrice = action.payload.data.totalPrice;
        }
      })
      .addCase(updateCartQuantity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default cartSlice.reducer;