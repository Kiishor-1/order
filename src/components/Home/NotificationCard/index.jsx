import Styles from './NotificationCard.module.css'
export default function NotificationCard({notificationImg,indexImg}) {
  return (
    <section className={Styles.card}>
      <img className={Styles.index} src={indexImg} alt="" />
      <img className={Styles.notification} src={notificationImg} alt="" />
    </section>
  )
}
