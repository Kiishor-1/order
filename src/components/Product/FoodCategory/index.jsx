import { useState } from 'react';
import Styles from './FoodCategory.module.css'

export default function FoodCategory() {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleItemClick = (index) => {
    setActiveIndex(index);
  };


  const category = [
    'Offers',
    'Burgers',
    'Fries',
    'Snacks',
    'Salads',
    'Cold Drinks',
    'Happy Meal',
    'Desserts',
    'Sauces',
    'Orbit'
  ]
  return (
    <div className={Styles.food_categories}>
      {
        category.length > 0 &&
        category.map((item, index) => (
          <div
            key={index}
            className={`${Styles.categoryItem} ${index === activeIndex ? Styles.active : ""
              }`}
            onClick={() => handleItemClick(index)}
          >
            {item} {item === 'Happy Meal' || item === 'Orbit' ? (<sapn>&reg;</sapn>) : ""}
          </div>
        ))
      }
    </div>
  )
}
