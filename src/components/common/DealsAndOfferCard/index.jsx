import Styles from './DealsAndOfferCard.module.css'
import Plus from '../../../assets/images/Plus.svg'

export default function DealsAndOfferCard({ restaurant, utilFlag }) {
  return (
    <div className={Styles.card}>
      <p className={Styles.desc}>{restaurant?.desc}</p>
      <h3 className={Styles.title}>{restaurant?.title}</h3>
      <img loading='lazy' src={restaurant.thumbnail} alt={restaurant?.title} />
      <span className={Styles.discount}>{restaurant?.discount}</span>
      {utilFlag &&
        <button className={Styles.add_button}>
          <img src={Plus} alt="" />
        </button>
      }
    </div>
  )
}
