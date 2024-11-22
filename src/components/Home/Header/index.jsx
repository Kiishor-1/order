import Styles from './Header.module.css'
import HeaderImage1 from '../../../assets/images/headerImage1.png'
import HeaderImage2 from '../../../assets/images/headerImage2.png'
import One from '../../../assets/images/1.png'
import Two from '../../../assets/images/2.png'
import Three from '../../../assets/images/3.png'
import Next from '../../../assets/images/Next.svg'
import Notification from '../../../assets/images/notification.svg'
import NotificationCard from '../NotificationCard'

export default function Header() {
    const data = [
        {
            id: 1,
            index: One,
            notification: Notification
        },
        {
            id: 2,
            index: Two,
            notification: Notification
        },
        {
            id: 3,
            index: Three,
            notification: Notification
        },
    ]
    return (
        <div className={`${Styles.header} 'container'`}>
            <section className={Styles.header_left}>
                <p>Order Restaurant food, takeaway and groceries.</p>
                <h1>Feast Your Senses, <span>Fast and Fresh</span></h1>
                <div className={Styles.pincode}>
                    <label htmlFor="pincode">Enter a postcode to see what we deliver</label>
                    <div className={Styles.pin}>
                        <input type="text" id='pincode' placeholder='e.g. EC4R 3TE' />
                        <button className={Styles.search}>Search</button>
                        <button className={Styles.search_md}>
                            <img src={Next} alt="" />
                        </button>
                    </div>
                </div>
            </section>
            <section className={Styles.header_right}>
                <div className={Styles.box}>
                    {
                        data.map((item) => (
                            <div key={item.id} className={`${Styles.cardBox}`}>
                                <NotificationCard
                                    notificationImg={item.notification}
                                    indexImg={item.index}
                                />
                            </div>
                        ))
                    }
                </div>
            </section>
            <img src={HeaderImage1} className={Styles.headerImage1} alt="" />
            <img src={HeaderImage2} className={Styles.headerImage2} alt="" />
        </div>
    )
}
