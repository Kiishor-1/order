import Styles from './Modal.module.css'

export default function Modal({ children, onClose }) {
  return (

    <div className={Styles.modal_overlay}>
      <div className={Styles.modal}>
        {children}
      </div>
    </div>
  )
}
