import FoodItem from '../FoodItem';
import Styles from './CardContainer.module.css';

export default function CardContainer({ data, item, restaurantId }) {
    return (
        <div className={Styles.card_container_wrapper}>
            <h2 className={item === 'Burgers' ? Styles.heading_first : Styles.heading}>{item}</h2>
            <div className={Styles.card_container}>
                {
                    data.length > 0 ? (
                        data.map((item, id) => (
                            <FoodItem key={id} data={item} restaurantId={restaurantId} />
                        ))
                    ) : (
                        <p>No items Found</p>
                    )
                }
            </div>
        </div>
    );
}
