import Styles from './OrderPlaced.module.css'
import Check from '../../assets/images/check.png'
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import toast from 'react-hot-toast';

export default function OrderPlaced() {
  const navigate = useNavigate();
  const { orderDetail, items } = useSelector((state) => state.cart);
  const { user, token } = useSelector((state) => state.auth);
  useEffect(() => {
    if (!user && !token) {
      navigate('/login');
    }
  }, [navigate, user, token])

  useEffect(() => {
    if (orderDetail.length === 0) {
      navigate('/');
    }
  }, [navigate, orderDetail])

  return (
    <div className={`${Styles.order_placed} container`}>
      <section className={Styles.success_message}>
        <img src={Check} alt="" />
        <h3>Order Placed Successfully</h3>
        <p>Your order is confirmed and on its way. Get set to savor your chosen delights!</p>
      </section>
      <section className={Styles.order_detail}>
        <div className="">
          {
            orderDetail.length > 0 &&
            orderDetail.map((item,id) => (
              <p key={id} className={Styles.item_details}>
                {item?.foodItem?.name}
              </p>
            ))
          }
        </div>
        <Link className={Styles.back_to_home} to={"/"}>{`Back to Home`}</Link>
      </section>
    </div>
  )
}
