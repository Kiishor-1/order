import  { useState } from 'react'
import Styles from './Logout.module.css'

export default function Logout({handleLogoutCancel, handleLogoutConfirm}) {
    return (
        <section className={Styles.logout_modal}>
            <p>Are you sure you want to logout?</p>
            <div className={Styles.modal_actions}>
                <button onClick={handleLogoutConfirm} className={Styles.confirm}>
                    Yes
                </button>
                <button onClick={handleLogoutCancel} className={Styles.cancel}>
                    No
                </button>
            </div>
        </section>
    )
}
