import Styles from './Card.module.css'

export default function Card({ category }) {
  return (
    <div className={Styles.card}>
      <img className={Styles.thumbnail} loading='lazy' src={category.thumbnail} alt="" />
      <div className={Styles.card_body}>
        <h5 className={Styles.title}>{category.title}</h5>
        <p className={Styles.stats}>{category.stats} Restaurants</p>
      </div>
    </div>
  )
}
