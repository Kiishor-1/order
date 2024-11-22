import DealCard from './DealCard'
import Menu from './Menu'
import Restaurant1 from '../../../assets/images/restaurant2.png';
import Restaurant2 from '../../../assets/images/restaurant.png';
import Restaurant3 from '../../../assets/images/restaurant2.png';
import Styles from './Deals.module.css'

export default function Deals() {
    const restaurants = [
        {
            id:1,
            desc: 'Restaurant',
            title: 'Chef Burgers London',
            discount:'40%',
            thumbnail:Restaurant1
        },
        {
            id:2,
            desc: 'Restaurant',
            title: 'Grand Ai Cafe London',
            discount:'20%',
            thumbnail:Restaurant2
        },
        {
            id:3,
            desc: 'Restaurant',
            title: 'Butterbrot Caf’e London',
            discount:'17%',
            thumbnail:Restaurant3
        },
    ]
    return (
        <div className={Styles.deals}>
            <Menu />
            <div className={Styles.cards}>
                {
                    restaurants.length > 0 &&
                    restaurants.map((restaurant)=>(
                        <DealCard key={restaurant.id} restaurant={restaurant}/>
                    ))
                }
            </div>
        </div>
    )
}
