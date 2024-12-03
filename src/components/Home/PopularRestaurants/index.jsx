import { useEffect, useState } from 'react';
import Card from './Card';
import Styles from './PopularRestaurants.module.css';
import axios from 'axios';
import { RESTAURANT_ENDPOINTS } from '../../../services/api';

const { FETCH_RESTAURANTS } = RESTAURANT_ENDPOINTS;

export default function PopularRestaurants({ heading }) {
    const [restaurants, setRestaurants] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRestaurants = async () => {
            try {
                const response = await axios.get(FETCH_RESTAURANTS); 
                setRestaurants(response.data?.restaurants);
            } catch (error) {
                console.error('Error fetching restaurants:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchRestaurants();
    }, []);

    return (
        <div className={Styles.popular_restaurants}>
            <div className={Styles.heading}>{heading}</div>
            {loading ? (
                <div className={Styles.loading}>Loading...</div>
            ) : restaurants.length > 0 ? (
                <div className={Styles.cards}>
                    {restaurants.map((restaurant) => (
                        <Card key={restaurant._id} restaurant={restaurant} />
                    ))}
                </div>
            ) : (
                <div className={Styles.no_data}>No restaurants found.</div>
            )}
        </div>
    );
}
