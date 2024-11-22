import Card from './Card'
import Styles from './PopularCategories.module.css'
import Dish1 from '../../../assets/images/Dish1.png';
import Dish2 from '../../../assets/images/Dish2.png';
import Dish3 from '../../../assets/images/Dish3.png';
import Dish4 from '../../../assets/images/Dish1.png';
import Dish5 from '../../../assets/images/Dish2.png';
import Dish6 from '../../../assets/images/Dish3.png';

export default function PopularCategories() {
    const categories = [
        {
            id:1,
            title:'Burgers & Fast food',
            stats:21,
            thumbnail:Dish1,
        },
        {
            id:2,
            title:'Salads',
            stats:32,
            thumbnail:Dish2,
        },
        {
            id:3,
            title:'Pasta & Casuals',
            stats:4,
            thumbnail:Dish3,
        },
        {
            id:4,
            title:'Pasta',
            stats:32,
            thumbnail:Dish4,
        },
        {
            id:5,
            title:'Breakfast',
            stats:4,
            thumbnail:Dish5,
        },
        {
            id:6,
            title:'Soups',
            stats:32,
            thumbnail:Dish6,
        },
    ]
    return (
        <div className={Styles.popular_categories}>
            <div className={Styles.heading}>Order.uk Popular Categories 🤩</div>
            <div className={Styles.cards}>
                {
                    categories.length > 0 &&
                    categories.map((category) => (
                        <Card key={category.id} category={category} />
                    ))
                }
            </div>
        </div>
    )
}
