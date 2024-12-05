import Styles from './Navbar.module.css';
import PromoIcon from '../../../assets/images/promoIcon.jpg';
import Basket from '../../../assets/images/Basket.png';
import Basket2 from '../../../assets/images/basket2.svg';
import Arrow from '../../../assets/images/arrow.png';
import Pinned from '../../../assets/images/Location.svg';
import Logo from '../../../assets/images/logo.png';
import User from '../../../assets/images/user.svg';
import Bar from '../../../assets/images/Menu.svg';
import Times from '../../../assets/images/times.svg';
import UserImage from '../../../assets/images/user.png';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import { logoutUser } from '../../../slices/authSlice';
import toast from 'react-hot-toast';
import { fetchFirstRestaurant } from '../../../services/operations/restaurantApi';

export default function Navbar({ openModal, setOpenModal }) {
  const navMenuRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const [restaurant, setRestaurant] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getRestaurant = async () => {
      try {
        const fetchedRestaurant = await fetchFirstRestaurant();
        if (!fetchedRestaurant) {
          return;
        }
        setRestaurant(fetchedRestaurant);
      } catch (err) {
        setError(err.message || "Something went wrong");
      }
    };
    getRestaurant();
  }, []);

  useEffect(() => {
    if (error) {
      toast.error(error?.message || 'Error occured in fetching restaurants');
      return;
    }
  }, [error])


  const openMenu = () => {
    navMenuRef.current.style.display = 'block';
  };
  const closeMenu = () => {
    navMenuRef.current.style.display = 'none';
  };

  const { items } = useSelector((state) => state.cart);

  const navLinks = [
    'Home',
    'Browse Menu',
    'Special Offers',
    'Restaurants',
    'Track Orders'
  ];


  const [activeIndex, setActiveIndex] = useState(null);

  const handleNavLink = (idx) => {
    setActiveIndex(idx);
  }


  const handleGoToCart = () => {
    if (!restaurant) {
      toast.error("No restaurants available");
      navigate("/");
      // return;
    }

    if (items.length === 0) {
      toast.error("No items in the basket");
      navigate("/");
      // return;
    }
    navigate(`/restaurants/${restaurant?._id}`);
    setOpenModal((prev) => !prev);
  }

  return (
    <div className="container">
      <nav className={Styles.nav_banner}>
        <section className={Styles.banner_left}>
          <img src={PromoIcon} alt="" />
          <span>
            Get 5% Off your first order,{' '}
            <span className={Styles.promo_code}>Promo: ORDER5</span>
          </span>
        </section>
        <section className={Styles.banner_right}>
          <div className={Styles.location}>
            <img src={Pinned} alt="" />
            Regent Street, A4, A4201, London
            <span className={Styles.change_location}>Change location</span>
          </div>
          <ul className={Styles.cart}>
            <li onClick={handleGoToCart}>
              <img className={Styles.basket} src={Basket} alt="cart image" />
              <button className={Styles.go_to_cart}> My Cart</button>
            </li>
            <li>{items && items.length > 0 && items.length}</li>
            <li>
              <img className={Styles.arrow} src={Arrow} alt="" />
            </li>
          </ul>
        </section>
      </nav>
      <div className={Styles.navbar}>
        <Link to={"/"}>
          <img className={Styles.logo} src={Logo} alt="" />
        </Link>
        <div className={Styles.nav_menu} ref={navMenuRef}>
          <img
            onClick={closeMenu}
            src={Times}
            className={Styles.close_btn}
            alt=""
          />

          <ul>
            {
              navLinks.length > 0 &&
              navLinks.map((link, index) => (
                <li key={index}
                  onClick={() => handleNavLink(index)}
                  className={`${Styles.nav_link} ${index === activeIndex ? Styles.active : ""
                    }`}
                >
                  {link}
                </li>
              ))
            }
          </ul>

          {user ? (
            <button
              className={Styles.auth_buttons}
              onClick={() => navigate('/profile')}
            >
              <img src={User} alt="" />
              Hey {user ? user?.name.split(' ')[0] : 'User'}
            </button>
          ) : (
            <button className={Styles.auth_buttons}>
              <img src={User} alt="" />
              <Link className={Styles.auth_nav} to={'/login'}>
                Login/Signup
              </Link>
            </button>
          )}
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
          <div className={Styles.items_at_cart} onClick={handleGoToCart}>
            {items && items.length > 0 && <span className={Styles.cart_badge}>{items.length}</span>}
            <img src={Basket2} alt="" />
            <button className={Styles.go_to_cart}> My Cart</button>
          </div>
        </div>
      </section>
    </div>
  );
}
