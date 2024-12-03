import Styles from './ProductDetails.module.css'
import GBP from '../../../assets/images/GBP.svg'
import Motocross from '../../../assets/images/Motocross.svg'
import Thumbnail from '../../../assets/images/RestaurantThumbnail.png'
import Review from '../../common/Review';

export default function ProductDetails({ restaurant }) {
    return (
        <header className={Styles.product_details_section}>
            <img src={Thumbnail} className={Styles.backgroundThumbnail} alt="" />
            <section className={Styles.product_details}>
                <p>{`I'm lovin it!`}</p>
                <h1>{restaurant?.name}</h1>
                <div className={Styles.services}>
                    <span>
                        <img src={GBP} alt="" />
                        Minimum Order:12 GBP
                    </span>
                    <span>
                        <img src={Motocross} alt="" />
                        Delivery in 20-25 Minutes
                    </span>
                </div>
            </section>
            <section className={Styles.thumbnail}>
                <img src={Thumbnail} alt="" />
                <section>
                <Review data={restaurant?.reviews || 3.6}/>
                </section>
            </section>
            <p className={Styles.tag}>
                <span>
                    Open Until
                    {restaurant?.opensUntil}
                </span>
            </p>
        </header>
    )
}
