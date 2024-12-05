import Styles from './Footer.module.css'
import Logo from '../../../assets/images/logo2.png'
import Stores from '../../../assets/images/stores.svg'
import Facebook from '../../../assets/images/Facebook.svg'
import Instagram from '../../../assets/images/Instagram.svg'
import Tiktok from '../../../assets/images/TikTok.svg'
import Snapchat from '../../../assets/images/Snapchat.svg'
import toast from 'react-hot-toast'
import { useState } from 'react'

export default function Footer() {
  const [subscribe, setSubscribe] = useState('');
  const handleChange = (e) => {
    setSubscribe(e.target.value);
  }
  const handleNewsLetter = (e) => {
    e.preventDefault();
    if (subscribe.length > 0) {
      toast(`Newsletters will be sent to ${subscribe}!`, {
        icon: '✉️',
      });
    }
    setSubscribe('');
  }
  const footerLinks = [
    'Privacy Policy',
    'Terms',
    'Pricing',
    'Do not sell or share my personal information'
  ]
  return (
    <>
      <div className={Styles.footer}>
        <div className={`${Styles.footer_nav} ${Styles.footer_brand}`}>
          <div className={Styles.brand}>
            <img src={Logo} alt="" />
          </div>
          <div className={Styles.store}>
            <img src={Stores} alt="" />
          </div>
          <div className={Styles.address}>{`Company # 490039-445, Registered with House of companies.`}</div>
        </div>
        <div className={`${Styles.footer_nav} ${Styles.footer_newsletter}`}>
          <h5>Get Exclusive Deals in your Inbox</h5>
          <form onSubmit={handleNewsLetter} className={Styles.subscribe}>
            <input type="text" value={subscribe} onChange={handleChange} placeholder='youremail@gmail.com' />
            <button>Subscribe</button>
          </form>
          <div className={Styles.policy}>we wont spam, read our <span className={Styles.email_policy}>email policy</span></div>
          <div className={Styles.social}>
            <img src={Facebook} alt="" />
            <img src={Instagram} alt="" />
            <img src={Tiktok} alt="" />
            <img src={Snapchat} alt="" />
          </div>
        </div>
        <div className={Styles.footer_nav}>
          <h5>Legal Pages</h5>
          <ul>
            <li>Terms and conditions</li>
            <li>Privacy</li>
            <li>Cookies</li>
            <li>Modern Slavery Statement</li>
          </ul>
        </div>
        <div className={Styles.footer_nav}>
          <h5>Important Links</h5>
          <ul>
            <li>Get help</li>
            <li>Add your restaurant</li>
            <li>Sign up to deliver</li>
            <li>Create a business account</li>
          </ul>
        </div>
      </div>
      {
        footerLinks.length > 0 &&
        <div className={Styles.footer_base}>
          <span>Order.uk Copyright 2024, All Rights Reserved.</span>
          <ul>
            {
              footerLinks.map((link, id) => (
                <li key={id}>{link}</li>
              ))
            }
          </ul>
        </div>
      }
    </>
  )
}
