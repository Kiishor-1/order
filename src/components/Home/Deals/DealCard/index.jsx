import Styles from './DealCard.module.css'

export default function DealCard({restaurant}) {
  return (
    <div className={Styles.deal}>
      <p className={Styles.desc}>{restaurant?.desc}</p>
      <h3 className={Styles.title}>{restaurant?.title}</h3>
      <img src={restaurant.thumbnail} alt={restaurant?.title} />
      <span className={Styles.discount}>{restaurant?.discount}</span>
    </div>
  )
}
