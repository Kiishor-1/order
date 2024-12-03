import axios from 'axios';
import { RESTAURANT_ENDPOINTS } from '../api';
import toast from 'react-hot-toast';

const { FETCH_FIRST_RESTAURANT } = RESTAURANT_ENDPOINTS;

export const fetchFirstRestaurant = async () => {
    try {
        const response = await axios.get(FETCH_FIRST_RESTAURANT);
        if (response.data.success) {
            return response.data.restaurant;
        } else {
            toast.error(response.data?.error || 'Failed to fetch restaurant')
            throw new Error(response.data.message || 'Failed to fetch restaurant');
        }
    } catch (error) {
        toast.error(error.response?.data?.message || 'Failed to fetch restaurant')
        console.error("Error fetching first restaurant:", error);
        throw error; 
    }
};
