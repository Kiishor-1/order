import Styles from './ReviewCard.module.css'
import Customer from '../../../../assets/images/Customer.png';
import Clock from '../../../../assets/images/Clock.svg';
import ReactStars from 'react-stars';
export default function ReviewCard({data:reviewItem}) {
    return (
        <div className={Styles.review_card}>
            <section className={Styles.card_header}>
                <aside className={Styles.profile}>
                    <img src={Customer} alt="" />
                    <div className={Styles.user}>
                        <h5>{reviewItem?.user?.name}</h5>
                        <span>{reviewItem?.user?.address}</span>
                    </div>
                </aside>
                <aside className={Styles.rating_info}>
                    <ReactStars
                        count={5}
                        value={reviewItem?.rating}
                        edit={false}
                        half={true}
                        size={24}
                        color2={'#ffd700'}
                    />
                    <p className={Styles.rating_date}>
                        <img src={Clock} alt="" />
                        <span>{reviewItem?.createdAt}</span>
                    </p>
                </aside>
            </section>
            <section className={Styles.review_info}>
                <p>
                    {
                        reviewItem.content.length > 150 ? reviewItem.content.substring(0,150):reviewItem?.content
                    }
                </p>
            </section>
        </div>
    )
}
