import { useState } from "react";
import Styles from "./AboutNav.module.css";

export default function AboutNav() {
  const [activeIndex, setActiveIndex] = useState(0);

  const menuItems = [
    "Frequent Questions",
    "Who are we?",
    "Partner Program",
    "Help & Support",
  ];

  const handleItemClick = (index) => {
    setActiveIndex(index);
  };

  return (
    <section className={Styles.about_nav}>
      <h3 className={Styles.about_title}>Know more about us!</h3>
      <ul className={Styles.about_nav_menu}>
        {menuItems.map((item, index) => (
          <li
            key={index}
            className={`${Styles.about_nav_item} ${
              index === activeIndex ? Styles.active : ""
            }`}
            onClick={() => handleItemClick(index)}
          >
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}
