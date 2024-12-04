import { useSelector } from "react-redux";
import Styles from "./MiniBasket.module.css";
import { Link } from "react-router-dom";
import Basket from "../../../assets/images/Basket.png";
import Remove from "../../../assets/images/Remove.svg";
import ForwardGreen from "../../../assets/images/ForwardGreen.svg";
import ForwardDarkGreen from "../../../assets/images/ForwardDarkGreen.svg";
import Share from "../../../assets/images/share.svg";
import toast from "react-hot-toast";
import { createSharedCart } from "../../../services/operations/sharableCartApi";

export default function MiniBasket({ isMobile, closeCart, handleRemoveFromCart,restaurantId ,items,totalPrice}) {
    const { token , user} = useSelector((state) => state.auth);

    const handleCopyLink = async () => {
        if(!token || !user){
            toast.error('Please log in to share your cart');
            return;
        }
        if (!items.length) {
            toast.error("Your cart is empty. Add items to share your cart.");
            return;
        }
    
        const cartData = { items };
        const sharedCart = await createSharedCart(token, cartData);
    
        if (sharedCart) {
            const cartLink = `${window.location.origin}/cart/${restaurantId}/${sharedCart._id}`; 
            navigator.clipboard
                .writeText(cartLink)
                .then(() => {
                    toast.success("Link copied to clipboard!");
                })
                .catch((err) => {
                    console.error("Failed to copy the link:", err);
                    toast.error("Could not copy the link.");
                });
        }
    };


    return (
        <aside className={`${Styles.mini_basket} ${isMobile ? Styles.mobile : ""}`}>
            <div className={Styles.share_cart}>
                <img src={Share} alt="" />
                <p>Share this cart with your friends</p>
                <span onClick={handleCopyLink}> Copy link</span>
            </div>
            <div className={Styles.basket}>
                <section className={Styles.header}>
                    <img src={Basket} alt="" />
                    <h3>My Basket</h3>
                    {isMobile && (
                        <button className={Styles.close_button} onClick={closeCart}>
                            x
                        </button>
                    )}
                </section>
                <section>
                    { items.length > 0 &&
                    items.map((item, id) => (
                        <div key={id} className={Styles.basket_item}>
                            <span>{item.quantity}X</span>
                            <div className={Styles.details}>
                                <p>₹ {item?.foodItem?.price * item.quantity}</p>
                                <h5>{item?.foodItem?.name}</h5>
                            </div>
                            <img
                                onClick={() => handleRemoveFromCart(item?.foodItem?._id)}
                                src={Remove}
                                alt=""
                            />
                        </div>
                    ))}
                </section>
                <section className={Styles.total_price}>
                    <p>
                        <h4>Sub Total</h4>
                        <span>₹{totalPrice}</span>
                    </p>
                    <p>
                        <h4>Discount</h4>
                        <span>-₹{items.length}</span>
                    </p>
                    <p>
                        <h4>Delivery Fee</h4>
                        <span>₹3</span>
                    </p>
                </section>

                <p className={Styles.final_price}>
                    <h5>Total to Pay</h5>
                    <span>₹{totalPrice - items.length + 3}</span>
                </p>
                <section className={Styles.bargain}>
                    Choose your free item..
                    <img className={Styles.gray_scaled} src={ForwardGreen} alt="" />
                </section>
                <section className={Styles.bargain}>
                    Apply coupon code here
                    <img src={ForwardGreen} alt="" />
                </section>

                <section className={Styles.payment}>
                    <img src={ForwardDarkGreen} alt="" />
                    <Link to="/checkout">Checkout!</Link>
                </section>
            </div>
        </aside>
    );
}
