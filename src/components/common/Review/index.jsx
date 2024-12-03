import Styles from './Review.module.css'
import ReactStars from 'react-stars'

export default function Review({data}) {
    return (
        <div className={Styles.reviews}>
            <span className={Styles.rating}>{data?.rating}</span>
            <ReactStars
                count={5}
                value={data?.rating}
                edit={false}
                half={true}
                size={20}
                color2={'#ffd700'}
            />
            <span className={Styles.review}>{data?.review} reviews</span>
        </div>
    )
}
