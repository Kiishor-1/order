import axios from 'axios';
import { USER_ENDPONTS } from '../api';

export const getUserDetails = async (userId, token) => {
    try {
        const response = await axios.get(USER_ENDPONTS.GET_USER, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching user details:', error);
        throw error.response?.data?.message || 'Failed to fetch user details';
    }
};

export const editUserDetails = async (userId, userData, token) => {
    try {
        const response = await axios.put(USER_ENDPONTS.EDIT_USER, userData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error editing user details:', error);
        throw error.response?.data?.message || 'Failed to edit user details';
    }
};
