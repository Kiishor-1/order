import axios from "axios";
import { toast } from "react-hot-toast";
import { CART_ENDPOINTS } from "../api";
import { addSharedCartToCart } from '../../slices/cartSlice';


export function fetchSharedCart(sharedCartId) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading shared cart...");
    try {
      const response = await axios.get(CART_ENDPOINTS.FETCH_SHARED_CART(sharedCartId));

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      const result = response.data.data;

      console.log('result',response.data.data)

      toast.success("Shared cart loaded successfully", { id: toastId });

      dispatch(addSharedCartToCart(result));
    } catch (error) {
      toast.error(error?.message || "Failed to fetch shared cart", { id: toastId });
      console.error(error);
    } finally {
      toast.dismiss(toastId);
    }
  };
}




// Function to create a shared cart
export async function createSharedCart(token, cartData) {
    const toastId = toast.loading("Creating shared cart...");
    let result = null;
    try {
        const response = await axios.post(
            CART_ENDPOINTS.CREATE_SHARED_CART,
            cartData, // Pass cart data in the request body
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        if (!response.data.success) {
            throw new Error(response.data.message);
        }

        result = response.data.data; // Assuming `data` contains the new shared cart info
        toast.success("Shared cart created successfully!");
    } catch (error) {
        console.error("Error creating shared cart:", error);
        toast.error("Could not create the shared cart.");
    } finally {
        toast.dismiss(toastId);
    }
    return result;
}
