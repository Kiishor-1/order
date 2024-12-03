import Card from './Card'
import Styles from './PopularCategories.module.css'
import { popularCategories } from '../../../helpers/mockData'

export default function PopularCategories({heading}) {
    return (
        <div className={Styles.popular_categories}>
            <div className={Styles.heading}>{heading?heading:""}</div>
            <div className={Styles.cards}>
                {
                    popularCategories.length > 0 &&
                    popularCategories.map((category) => (
                        <Card key={category.id} category={category} />
                    ))
                }
            </div>
        </div>
    )
}
