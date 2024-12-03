import axios from 'axios';
import { REVIEW_ENDPOINTS } from '../api';

export async function fetchCustomerReviews() {
  try {
    const response = await axios.get(REVIEW_ENDPOINTS.FETCH_REVIEWS);
    if (response.data.success) {
      return response.data.reviews;
    } else {
      throw new Error(response.data.message || 'Failed to fetch reviews');
    }
  } catch (error) {
    console.error('Error fetching customer reviews:', error);
    throw error;
  }
}
