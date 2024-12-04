import axios from "axios";
import { ADDRESS_ENDPOINTS } from "../api";

const {
    GET_USER_ADDRESSES,
    ADD_ADDRESS,
    UPDATE_ADDRESS,
    DELETE_ADDRESS,
    SET_DEFAULT_ADDRESS,
} = ADDRESS_ENDPOINTS;

const getToken = () => {
    return localStorage.getItem("token"); 
};

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
        return response.data.data;
    } catch (error) {
        throw error.response?.data?.message || "Error fetching addresses";
    }
};

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
