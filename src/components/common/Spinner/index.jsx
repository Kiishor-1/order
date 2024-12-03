import Styles from './Spinner.module.css'

export default function Spinner() {
  return <div className={Styles.spinner_container}>
    <div className={Styles.spinner}></div>
  </div>
}
