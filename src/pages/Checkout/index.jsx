import { useDispatch, useSelector } from "react-redux";
import Styles from "./Checkout.module.css";
import ArrowLeft from "../../assets/images/arrowLeft.svg";
import PopularRestaurants from "../../components/Home/PopularRestaurants";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useMemo } from "react";
import MapPin from "../../assets/images/MapPin.svg";
import PaymentCard from "../PaymentMethod/PaymentCard";
import ArrowRight from "../../assets/images/ArrowRight.svg";
import { syncCart } from "../../services/operations/sharableCartApi";
import toast from "react-hot-toast";
import { fetchCart } from "../../slices/cartSlice";
import Spinner from "../../components/common/Spinner";

export default function Checkout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, token } = useSelector((state) => state.auth);
  const { items, totalPrice, loading } = useSelector((state) => state.cart);

  const defaultAddress = useMemo(() => {
    if (user?.addresses?.length) {
      return user.addresses.find(
        (addr) => addr.isDefault === true || addr.isDefault === "true"
      );
    }
    return null;
  }, [user]);

  const addresses = useMemo(() => user?.addresses || [], [user]);

  const subtotal = useMemo(() => totalPrice + 10 + 3 - items.length, [
    totalPrice,
    items.length,
  ]);

  useEffect(() => {
    if (!user && !token) {
      navigate("/login");
    }
  }, [navigate, user, token]);

  useEffect(() => {
    const syncAndFetchCart = async () => {
      if (user && token) {
        const localCart = JSON.parse(localStorage.getItem("cart")) || [];
        if (localCart.length > 0) {
          try {
            await syncCart(token, localCart);
          } catch (err) {
            toast.error("Sync failed. Please try again later");
          }
        }
        dispatch(fetchCart());
      }
    };
    syncAndFetchCart();
  }, [user, token, dispatch]);

  const data = {
    icon1: MapPin,
    icon2: ArrowRight,
    card: "Delivery Address",
    balance: defaultAddress
      ? `${defaultAddress.fullAddress}, ${defaultAddress.cityOrDistrict}, ${defaultAddress.state}, ${defaultAddress.zip}`
      : "No default address selected",
  };

  const findPaymentOptions = async () => {
    if (items) {
      try {
        const updatedCart = await syncCart(token, items);
        if (updatedCart) {
          dispatch(fetchCart());
          navigate("/payment-methods");
        }
      } catch (err) {
        toast.error(err.message || "Try again later");
      }
    }
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className={`${Styles.checkout} container`}>
      <h3>
        <img onClick={() => navigate(-1)} src={ArrowLeft} alt="Back" />
        Your Order Details
      </h3>
      <main className={Styles.main}>
        <section className={Styles.ordered_items}>
          <div className={Styles.items_in_basket}>
            {items.length > 0 ? (
              items.map((item, id) => (
                <div
                  key={id}
                  className={`${Styles.item} ${
                    id < items.length - 1 && Styles.seperator
                  }`}
                >
                  <img src={item?.foodItem?.image} alt={item.name} />
                  <div>
                    <h5>{item?.foodItem?.name}</h5>
                    <p>{item?.quantity}x</p>
                  </div>
                  <span>₹{item?.foodItem?.price}</span>
                </div>
              ))
            ) : (
              <p className={Styles.no_item}>
                <span>No items in the basket</span>
              </p>
            )}
          </div>
          {items.length > 0 && (
            <label className={Styles.order_notes} htmlFor="Notes">
              <p>Notes</p>
              <input type="text" id="Notes" placeholder="Add order notes" />
            </label>
          )}
        </section>
       {
        items && items.length > 0 && <section className={Styles.billing}>
        <Link to={"/address"}>
          <PaymentCard data={data} cardFlag={true} utilFlag={true} />
        </Link>
        <div className={Styles.sum_total}>
          <p>
            <span className={Styles.key}>Items</span>
            <span className={Styles.value}>₹{totalPrice || 0}</span>
          </p>
          <p>
            <span className={Styles.key}>Sales Tax</span>
            <span className={Styles.value}>
              ₹{items.length > 0 ? 10 : 0}
            </span>
          </p>
          <p>
            <span className={Styles.key}>Discount</span>
            <span className={Styles.value}>-₹{items.length}</span>
          </p>
          <p>
            <span className={Styles.key}>Delivery fee</span>
            <span className={Styles.value}>
              ₹{items.length > 0 ? 3 : 0}
            </span>
          </p>
        </div>
        <p className={Styles.sub_total}>
          <span className={Styles.key}>
            Subtotal ({items.length} items)
          </span>
          <span className={Styles.value}>₹{subtotal}</span>
        </p>
        <button onClick={findPaymentOptions}>Choose Payment Method</button>
      </section>
       }
      </main>
      <PopularRestaurants heading={"Similar Restaurants"} />
    </div>
  );
}
