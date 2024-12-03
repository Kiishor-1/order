import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { RESTAURANT_ENDPOINTS } from "../services/api";
import axios from "axios";

const { FETCH_RESTAURANTS, FETCH_RESTAURANT_DETAILS } = RESTAURANT_ENDPOINTS;


export const fetchRestaurants = createAsyncThunk(
    "restaurant/fetchRestaurants",
    async (_, { rejectWithValue }) => {
        const toastId = toast.loading("Fetching restaurants...");
        try {
            const response = await axios.get(FETCH_RESTAURANTS);

            if (!response?.data?.success) {
                toast.dismiss(toastId);
                toast.error(response?.data?.error || "Failed to fetch restaurants");
                return rejectWithValue(response?.data?.error || "Failed to fetch restaurants");
            }

            console.log(response.data);

            toast.dismiss(toastId);
            // toast.success("Restaurants fetched successfully");
            return response.data.restaurants;
        } catch (error) {
            toast.dismiss(toastId);
            toast.error(error?.response?.data?.error || "Error fetching restaurants");
            return rejectWithValue(error?.response?.data?.error || "Error fetching restaurants");
        }
    }
);


export const fetchRestaurantDetails = createAsyncThunk(
    "restaurant/fetchRestaurantDetails",
    async (restaurantId, { rejectWithValue }) => {
        const toastId = toast.loading("Fetching restaurant details...");
        try {
            const response = await axios.get(FETCH_RESTAURANT_DETAILS(restaurantId));

            if (!response?.data?.success) {
                toast.dismiss(toastId);
                toast.error(response?.data?.error || "Failed to fetch restaurant details");
                return rejectWithValue(response?.data?.error || "Failed to fetch restaurant details");
            }

            toast.dismiss(toastId);
            // toast.success("Restaurant details fetched successfully");
            return response.data.restaurant;
        } catch (error) {
            toast.dismiss(toastId);
            toast.error(error?.response?.data?.error || "Error fetching restaurant details");
            return rejectWithValue(error?.response?.data?.error || "Error fetching restaurant details");
        }
    }
);

const initialState = {
    restaurants: [],
    currentRestaurant: null,
    isLoading: false,
    error: null,
    status: "idle",
};

// Slice
const restaurantSlice = createSlice({
    name: "restaurant",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch all restaurants
            .addCase(fetchRestaurants.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchRestaurants.fulfilled, (state, action) => {
                state.isLoading = false;
                state.restaurants = action.payload;
                state.status = "succeed";
            })
            .addCase(fetchRestaurants.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || action.error;
                state.status = "failed";
            })

            // Fetch specific restaurant details
            .addCase(fetchRestaurantDetails.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchRestaurantDetails.fulfilled, (state, action) => {
                state.isLoading = false;
                state.currentRestaurant = action.payload;
                state.status = "succeed";
            })
            .addCase(fetchRestaurantDetails.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || action.error;
                state.status = "failed";
            });
    },
});

export default restaurantSlice.reducer;
