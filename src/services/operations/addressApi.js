import axios from "axios";
import { ADDRESS_ENDPOINTS } from "../api";

const {
    GET_USER_ADDRESSES,
    ADD_ADDRESS,
    UPDATE_ADDRESS,
    DELETE_ADDRESS,
    SET_DEFAULT_ADDRESS,
} = ADDRESS_ENDPOINTS;

// Function to get token from localStorage
const getToken = () => {
    return localStorage.getItem("token"); // Assuming the token is stored with the key 'token'
};

// Fetch all addresses for a user
export const fetchAllAddresses = async () => {
    const token = getToken();
    if (!token) throw new Error("No token found in localStorage");

    try {
        const response = await axios.get(GET_USER_ADDRESSES, {
            headers: {
                'Accept': 'application/json', 
                Authorization: `Bearer ${token}`,
            },
        });
        console.log(response.data)
        return response.data.data;
    } catch (error) {
        throw error.response?.data?.message || "Error fetching addresses";
    }
};

// Add a new address
export const addAddress = async (address) => {
    const token = getToken();
    if (!token) throw new Error("No token found in localStorage");

    try {
        const response = await axios.post(ADD_ADDRESS, address, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || "Error adding address";
    }
};

// Update an existing address
export const updateAddress = async (address) => {
    const token = getToken();
    if (!token) throw new Error("No token found in localStorage");

    try {
        const response = await axios.put(UPDATE_ADDRESS(address._id), address, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data?.address;
    } catch (error) {
        throw error.response?.data?.message || "Error updating address";
    }
};

// Delete an address
export const deleteAddress = async (addressId) => {
    const token = getToken();
    if (!token) throw new Error("No token found in localStorage");

    try {
        const response = await axios.delete(DELETE_ADDRESS(addressId), {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || "Error deleting address";
    }
};

// Set an address as default
export const setDefaultAddress = async (addressId) => {
    const token = getToken();
    if (!token) throw new Error("No token found in localStorage");

    try {
        const response = await axios.put(SET_DEFAULT_ADDRESS(addressId), null, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log('response',response)
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || "Error setting default address";
    }
};
