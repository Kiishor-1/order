import Styles from './Navbar.module.css'
import PromoIcon from '../../../assets/images/promoIcon.jpg'
import Basket from '../../../assets/images/Basket.png'
import Basket2 from '../../../assets/images/basket2.svg'
import Arrow from '../../../assets/images/arrow.png'
import Pinned from '../../../assets/images/Location.svg'
import Logo from '../../../assets/images/logo.png'
import User from '../../../assets/images/user.svg'
import Bar from '../../../assets/images/Menu.svg'
import Times from '../../../assets/images/times.svg'
import UserImage from '../../../assets/images/user.png'
import { Link, NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useRef } from 'react'
import { logoutUser } from '../../../slices/authSlice'

export default function Navbar() {
  const navMenuRef = useRef();
  const dispatch = useDispatch();
  const openMenu = () => {
    navMenuRef.current.style.display = "block";
  }
  const closeMenu = () => {
    navMenuRef.current.style.display = "none";
  }
  const { user } = useSelector((state) => state.auth);
  const handlLogout = ()=>{
    dispatch(logoutUser());
  }
  return (
    <div className="container">
      <nav className={Styles.nav_banner}>
        <section className={Styles.banner_left}>
          <img src={PromoIcon} alt="" />
          <span>Get 5% Off your first order, <span className={Styles.promo_code}>Promo: ORDER5</span></span>
        </section>
        <section className={Styles.banner_right}>
          <div className={Styles.location}>
            <img src={Pinned} alt="" />
            Regent Street, A4, A4201, London
            <span className={Styles.change_location}>Change location</span>
          </div>
          <ul className={Styles.cart}>
            <li>
              <img className={Styles.basket} src={Basket} alt="cart image" />
              <span> My Cart</span>
            </li>
            <li></li>
            <li>
              <img className={Styles.arrow} src={Arrow} alt="" />
            </li>
          </ul>
        </section>
      </nav>
      <div className={Styles.navbar}>
        <img className={Styles.logo} src={Logo} alt="" />
        <div className={Styles.nav_menu} ref={navMenuRef}>
          <img onClick={closeMenu} src={Times} className={Styles.close_btn} alt="" />
          <ul>
            <li>
              <NavLink
                to="/"
                className={({ isActive }) => (isActive ? Styles.active : Styles.underline_none)}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/browse-menu"
                className={({ isActive }) => (isActive ? Styles.active : Styles.underline_none)}
              >
                Browse Menu
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/special-offers"
                className={({ isActive }) => (isActive ? Styles.active : Styles.underline_none)}
              >
                Special Offers
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/restaurants"
                className={({ isActive }) => (isActive ? Styles.active : Styles.underline_none)}
              >
                Restaurants
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/track-orders"
                className={({ isActive }) => (isActive ? Styles.active : Styles.underline_none)}
              >
                Track Orders
              </NavLink>
            </li>
          </ul>
          <button className={Styles.auth_buttons}>
            <img src={User} alt="" />
            {
              user ?
                (<Link className={Styles.auth_nav} onClick={handlLogout}>
                  Logout
                </Link>) : (
                  <Link className={Styles.auth_nav} to={"/login"}>
                    Login/Signup
                  </Link>
                )
            }
          </button>
        </div>
        <div className={Styles.menu_bar}>
          <img onClick={openMenu} src={Bar} alt="" />
        </div>
      </div>
      <section className={Styles.user_n_cart}>
        <div className={Styles.user_cart_wrapper}>
          <div className={Styles.user}>
            <img src={UserImage} alt="" />
            Hey {user ? user?.name.split(' ')[0] : 'User'}
          </div>
          <div className={Styles.items_at_cart}>
            <img src={Basket2} alt="" />
            My Cart
          </div>
        </div>
      </section>
    </div>
  )
}
