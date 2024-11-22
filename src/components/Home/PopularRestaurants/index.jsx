import Card from './Card'
import Styles from './PopularRestaurants.module.css'
import Restaurant1 from '../../../assets/images/popularRestaurants.png'
import Restaurant2 from '../../../assets/images/popularRestaurants.png'
import Restaurant3 from '../../../assets/images/popularRestaurants.png'
import Restaurant4 from '../../../assets/images/popularRestaurants.png'
import Restaurant5 from '../../../assets/images/popularRestaurants.png'
import Restaurant6 from '../../../assets/images/popularRestaurants.png'

export default function PopularRestaurants() {
    const restaurants = [
        {
            id: 1,
            title: 'McDonald’s London',
            thumbnail: Restaurant1
        },
        {
            id: 2,
            title: 'Papa Johns',
            thumbnail: Restaurant2
        },
        {
            id: 3,
            title: 'KFC West London',
            thumbnail: Restaurant3
        },
        {
            id: 4,
            title: 'Texas Chicken',
            thumbnail: Restaurant4
        },
        {
            id: 5,
            title: 'Burger King',
            thumbnail: Restaurant5
        },
        {
            id: 6,
            title: 'Shaurma 1',
            thumbnail: Restaurant6
        }
    ]
    return (
        <div className={Styles.popular_restaurants}>
            <div className={Styles.heading}>Popular Restaurants</div>
            <div className={Styles.cards}>
                {
                    restaurants.length > 0 &&
                    restaurants.map((restaurant) => (
                        <Card key={restaurant.id} restuarant={restaurant} />
                    ))
                }
            </div>
        </div>
    )
}
