import { useState, useEffect, useRef } from "react";
import Styles from "./Menu.module.css";
import Next from "../../../../assets/images/Next.svg";
import Cuisine from "../../../../assets/images/Cuisine.svg";

export default function Menu() {
  const menuItems = ["Vegan", "Sushi", "Pizza & Fast food", "Others"];
  const [activeItem, setActiveItem] = useState(menuItems[0]);
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const modalRef = useRef(null);

  const handleItemClick = (item) => {
    setActiveItem(item);
    setIsModalOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsModalOpen(false);
      }
    };

    if (isModalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isModalOpen]);

  return (
    <div className={Styles.menu}>
      <h3 className={Styles.heading}>Up to -40% 🎊 Order.uk exclusive deals</h3>
      <h3 className={Styles.heading_md}>Up to -40% Discount Offers 🎊 </h3>
      <ul className={Styles.menu_items}>
        {menuItems.map((item, id) => (
          <li
            key={id}
            className={`${Styles.menu_item} ${
              item === activeItem ? Styles.active : ""
            }`}
            onClick={() => handleItemClick(item)}
          >
            {item}
          </li>
        ))}
      </ul>

      <div className={Styles.mobile_menu} onClick={() => setIsModalOpen(true)}>
        <span className={Styles.mobile_item}>
          <img className={Styles.arrow} src={Next} alt="" />
          {activeItem}
        </span>
      </div>


      {isModalOpen && (
        <div className={Styles.modal}>
          <div className={Styles.modal_content} ref={modalRef}>
            <h4 className={Styles.modal_heading}>
              <img src={Cuisine} alt="" />
              Menu
            </h4>
            <ul>
              {menuItems.map((item, id) => (
                <li
                  key={id}
                  className={`${Styles.modal_item} ${
                    item === activeItem ? Styles.active : ""
                  }`}
                  onClick={() => handleItemClick(item)}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
