import Styles from './Skeleton.module.css';

export default function Skeleton() {
  return (
    <header className={Styles.skeleton_page}>
      <aside className={Styles.skeleton_items}>
        <div className={Styles.item1}></div>
        <div className={Styles.item2}></div>
        <div className={Styles.item3}></div>
        <div className={Styles.item4}></div>
      </aside>
      <aside className={Styles.thumbnail}>
      </aside>
    </header>
  )
}

