import Styles from './Card.module.css'

export default function Card({restuarant}) {
  return (
    <div className={Styles.card}>
      <img className={Styles.thumbnail} src={restuarant.thumbnail} alt="" />
      <h5 className={Styles.title}>{restuarant.title}</h5>
    </div>
  )
}
