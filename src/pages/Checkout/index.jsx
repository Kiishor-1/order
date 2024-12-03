import { useDispatch, useSelector } from "react-redux";
import Styles from "./Checkout.module.css";
import ArrowLeft from "../../assets/images/arrowLeft.svg";
import PopularRestaurants from "../../components/Home/PopularRestaurants";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import MapPin from "../../assets/images/MapPin.svg";
import PaymentCard from "../PaymentMethod/PaymentCard";
import ArrowRight from "../../assets/images/ArrowRight.svg";

export default function Checkout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, token } = useSelector((state) => state.auth);
  const { items, totalPrice } = useSelector((state) => state.cart);
  const [addresses, setAddresses] = useState([]);
  const [defaultAddress, setDefaultAddress] = useState(null);

  useEffect(() => {
    if (!user && !token) {
      navigate("/login");
    }
  }, [navigate, user, token]);
  useEffect(() => {
    if (user?.addresses && user.addresses.length > 0) {
      setAddresses(user.addresses);
      const defaultAddr = user.addresses.find(
        (addr) => addr.isDefault === true || addr.isDefault === "true"
      );
      setDefaultAddress(defaultAddr || null);
    } else {
      setAddresses([]);
      setDefaultAddress(null);
    }
  }, [user]);

  console.log("User:", user);
  console.log("Default Address:", defaultAddress);

  const data = {
    icon1: MapPin,
    icon2: ArrowRight,
    card: "Delivery Address",
    balance: defaultAddress
      ? `${defaultAddress.fullAddress}, ${defaultAddress.cityOrDistrict}, ${defaultAddress.state}, ${defaultAddress.zip}`
      : "No default address selected",
  };

  return (
    <div className={`${Styles.checkout} container`}>
      <h3>
        <img onClick={()=>navigate(-1)} src={ArrowLeft} alt="Back" />
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
        <section className={Styles.billing}>
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
              <span className={Styles.value}>₹{items.length > 0 ? 10:0}</span>
            </p>
            <p>
              <span className={Styles.key}>Discount</span>
              <span className={Styles.value}>-₹{items.length}</span>
            </p>
            <p>
              <span className={Styles.key}>Delivery fee</span>
              <span className={Styles.value}>₹{items.length > 0 ? 3:0}</span>
            </p>
          </div>
          <p className={Styles.sub_total}>
            <span className={Styles.key}>Subtotal ({items.length} items)</span>
            <span className={Styles.value}>
              ₹{totalPrice + 10 + 3 - items.length}
            </span>
          </p>
          <button onClick={() => navigate("/payment-methods")}>
            Choose Payment Method
          </button>
        </section>
      </main>
      <PopularRestaurants heading={"Similar Restaurants"} />
    </div>
  );
}
