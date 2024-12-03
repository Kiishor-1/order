import { offerAndDiscount } from '../../../helpers/mockData'
import Styles from './Offers.module.css'
import DealsAndOfferCard from '../../common/DealsAndOfferCard'

export default function Offers({heading,  headingMd}) {
    return (
        <div className={Styles.offers}>
            {heading && headingMd &&<Menu heading={heading} headingMd={headingMd} />}
            <div className={Styles.cards}>
                {
                    offerAndDiscount.length > 0 &&
                    offerAndDiscount.map((restaurant)=>(
                        <DealsAndOfferCard key={restaurant.id}  utilFlag={true} restaurant={restaurant}/>
                    ))
                }
            </div>
        </div>
    )
}
