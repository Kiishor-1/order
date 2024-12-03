import { Link } from 'react-router-dom';
import Styles from './Card.module.css';

export default function Card({ restaurant }) {
  return (
    <Link to={`/restaurants/${restaurant._id}`} className={Styles.card}>
      <img
        className={Styles.thumbnail}
        src={restaurant.image || 'https://via.placeholder.com/150'}
        alt={restaurant.name}
      />
      <h5 className={Styles.title}>{restaurant.name}</h5>
    </Link>
  );
}
