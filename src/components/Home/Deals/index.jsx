import Menu from './Menu'
import { dealsOnRestaurant,offerAndDiscount } from '../../../helpers/mockData'
import Styles from './Deals.module.css'
import DealsAndOfferCard from '../../common/DealsAndOfferCard'

export default function Deals({heading,  headingMd}) {
    return (
        <div className={Styles.deals}>
            {heading && headingMd &&<Menu heading={heading} headingMd={headingMd} />}
            <div className={Styles.cards}>
                {
                    dealsOnRestaurant.length > 0 &&
                    dealsOnRestaurant.map((restaurant)=>(
                        <DealsAndOfferCard key={restaurant.id} restaurant={restaurant}/>
                    ))
                }
            </div>
        </div>
    )
}
