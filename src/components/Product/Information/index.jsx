import { useState } from 'react';
import Styles from './Information.module.css';

export default function Information() {
    const [activeIndex, setActiveIndex] = useState(0);

    const handleItemClick = (index) => {
        setActiveIndex(index);
    };

    const info = [
        {
            title: 'Delivery information',
            data: [
                { key: 'Monday', value: '12:00 AM - 3:00 AM, 8:00 AM - 3:00 AM' },
                { key: 'Tuesday', value: '8:00 AM - 3:00 AM' },
                { key: 'Wednesday', value: '8:00 AM - 3:00 AM' },
                { key: 'Thursday', value: '8:00 AM - 3:00 AM' },
                { key: 'Friday', value: '8:00 AM - 3:00 AM' },
                { key: 'Saturday', value: '8:00 AM - 3:00 AM' },
                { key: 'Sunday', value: '8:00 AM - 12:00 AM' },
                { key: 'Estimated time until delivery', value: '20 min' }
            ]
        },
        {
            title: 'Contact information',
            data: [
                'If you have allergies or other dietary restrictions, please contact the restaurant. The restaurant will provide food-specific information upon request',
                { key: 'Phone number', value: '+934443-43' },
                { key: 'Website', value: 'https://mcdonalds.uk/' }
            ]
        },
        {
            title: 'Operational Times',
            data: [
                { key: 'Monday', value: '8:00 AM - 3:00 AM' },
                { key: 'Tuesday', value: '8:00 AM - 3:00 AM' },
                { key: 'Wednesday', value: '8:00 AM - 3:00 AM' },
                { key: 'Thursday', value: '8:00 AM - 3:00 AM' },
                { key: 'Friday', value: '8:00 AM - 3:00 AM' },
                { key: 'Saturday', value: '8:00 AM - 3:00 AM' },
                { key: 'Sunday', value: '8:00 AM - 12:00 AM' }
            ]
        }
    ];

    return (
        <div className={Styles.info}>
            {info.map((section, sectionIndex) => (
                <div key={sectionIndex}
                    className={`${Styles.item_info} ${sectionIndex === activeIndex ? Styles.active : ""
                        } ${sectionIndex === 0 ? Styles.border_radius_start : sectionIndex === 2 ? Styles.border_radius_end : ""}`}
                    onClick={() => handleItemClick(sectionIndex)}
                >
                    <h2 className={Styles.title}>{section.title}</h2>
                    <ul>
                        {section.data.map((item, itemIndex) => {
                            if (typeof item === 'string') {
                                return <li className={Styles.precaution} key={itemIndex}>{item}</li>;
                            }

                            // Otherwise, render key-value pairs for objects
                            return (
                                <li key={itemIndex}>
                                    <strong>{item.key}: </strong>
                                    {(item.key === 'Phone number' || item.key === 'Website') &&  (<br/>)}
                                    {item.value}
                                </li>
                            );
                        })}
                    </ul>
                </div>
            ))}
        </div>
    );
}
