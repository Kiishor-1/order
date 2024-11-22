import Styles from './AdCenter.module.css'
import Logo from '../../../assets/images/logo.png'
import Stores from '../../../assets/images/stores.svg'
import Buddies from '../../../assets/images/buddies.png'

export default function AdCenter() {
    return (
        <section className={Styles.ad_container}>
            <div className={Styles.content}>
            <h3 className={Styles.ad_title}>
                <img src={Logo} alt="" />
                <span>ing is more</span>
            </h3>
            <p className={Styles.desc}>
                <span>Personalised </span> & Instant
            </p>
            <p className={Styles.store_desc}>
            Download the Order.uk app for faster ordering
            </p>
            <div className={Styles.stores}>
                <img src={Stores} alt="" />
            </div>
            </div>
            <img src={Buddies} className={Styles.ad_image} alt="" />
        </section>
    )
}
