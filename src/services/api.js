const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;

export const AUTH_ENDPOINTS = {
    REGISTER: `${BASE_URL}/auth/register`,
    LOGIN: `${BASE_URL}/auth/login`,
    LOGOUT_USER: `${BASE_URL}/auth/logout`
}

export const RESTAURANT_ENDPOINTS = {
    FETCH_RESTAURANTS: `${BASE_URL}/restaurants`,
    FETCH_RESTAURANT_DETAILS: (id) => `${BASE_URL}/restaurants/${id}`,
    FETCH_FIRST_RESTAURANT: `${BASE_URL}/restaurants/first`
};

export const ADDRESS_ENDPOINTS = {
    GET_USER_ADDRESSES: `${BASE_URL}/users/addresses`,
    ADD_ADDRESS: `${BASE_URL}/users/addresses`,
    UPDATE_ADDRESS: (addressId) => `${BASE_URL}/users/addresses/${addressId}`,
    DELETE_ADDRESS: (addressId) => `${BASE_URL}/users/addresses/${addressId}`,
    SET_DEFAULT_ADDRESS: (addressId) => `${BASE_URL}/users/addresses/${addressId}/default`
}

export const CART_ENDPOINTS = {
    FETCH_CART: `${BASE_URL}/users/cart`,
    ADD_TO_CART: `${BASE_URL}/users/cart`,
    REMOVE_FROM_CART: (itemId) => `${BASE_URL}/users/cart/${itemId}`,
    UPDATE_CART_QUANTITY: (itemId) => `${BASE_URL}/users/cart/${itemId}`,
    CLEAR_CART: `${BASE_URL}/users/cart/clear`,
    FETCH_SHARED_CART: (cartId) => `${BASE_URL}/users/cart/shared/${cartId}`,
    CREATE_SHARED_CART: `${BASE_URL}/users/cart/shared`,
    SYNC_CART:`${BASE_URL}/users/cart/sync`,
};

export const REVIEW_ENDPOINTS = {
    FETCH_REVIEWS:`${BASE_URL}/reviews`,
}
