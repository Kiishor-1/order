import { useDispatch, useSelector } from 'react-redux';
import { addItemToCart } from '../../../slices/cartSlice';
import Styles from './FoodItem.module.css';
import Plus from '../../../assets/images/Plus.svg';

export default function FoodItem({ data, }) {
    const dispatch = useDispatch();

    const handleAddToCart = () => {
        dispatch(addItemToCart({ ...data }));
    };

    return (
        <div className={Styles.item_card}>
            <div className={Styles.content}>
                <h3>{data?.name}</h3>
                <p>{data?.desc}</p>
                <span>₹ {data?.price}</span>
            </div>
            <div className={Styles.item_img_container}>
                <img loading='lazy' src={data?.image} alt="" />
                <button className={Styles.add_button} onClick={handleAddToCart}>
                    <img src={Plus} alt="" />
                </button>
            </div>
        </div>
    );
}
