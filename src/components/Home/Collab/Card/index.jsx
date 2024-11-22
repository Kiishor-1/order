import Styles from './Card.module.css'

export default function Card({data}) {
  return (
    <section className={Styles.card}>
      <p className={Styles.desc}>{data?.desc}</p>
      <h2 className={Styles.title}>{data?.title}</h2>
      <button>Get started</button>
      <img src={data?.thumbnail} alt="" />
      <span className={Styles.offers}>{data?.offerText}</span>
    </section>
  )
}
