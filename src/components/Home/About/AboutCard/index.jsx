import Styles from './AboutCard.module.css'

export default function AboutCard({data}) {
  return (
    <section className={Styles.about_card}>
      <h5>{data?.task}</h5>
      <img src={data?.taskImage} alt="" />
      <p>{data?.taskDesc}</p>
    </section>
  )
}
