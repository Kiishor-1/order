import { useState, useEffect, useRef } from 'react';
import Styles from './CustomerReviews.module.css';
import Back from '../../../assets/images/Back.svg';
import ReviewCard from './ReviewCard';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import Review from '../../common/Review';
import { fetchCustomerReviews } from '../../../services/operations/reviewApi';

export default function CustomerReviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const swiperRef = useRef(null);

  const slideNext = () => {
    if (swiperRef.current) {
      swiperRef.current.slideNext();
    }
  };

  const slidePrev = () => {
    if (swiperRef.current) {
      swiperRef.current.slidePrev();
    }
  };

  const customReview = {
    rating: 3.5,
    review: 4500
  };

  useEffect(() => {
    const loadReviews = async () => {
      try {
        const data = await fetchCustomerReviews();
        setReviews(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadReviews();
  }, []);

  return (
    <div className={Styles.review_section}>
      <div className={Styles.review}>
        <section className={Styles.header}>
          <h2 className={Styles.heading}>Customer Reviews</h2>
          <aside className={Styles.slider_control}>
            <button onClick={slidePrev}>
              <img className={Styles.prev} src={Back} alt="Previous" />
            </button>
            <button onClick={slideNext}>
              <img className={Styles.next} src={Back} alt="Next" />
            </button>
          </aside>
        </section>
        <section className={Styles.review_slider}>
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p className={Styles.error}>{error}</p>
          ) : (
            <Swiper
              onSwiper={(swiper) => (swiperRef.current = swiper)}
              loop={true}
              pagination={{ clickable: true }}
              breakpoints={{
                1024: { slidesPerView: 3, spaceBetween: 30 },
                992: { slidesPerView: 2, spaceBetween: 40 },
                768: { slidesPerView: 1, spaceBetween: 20 },
              }}
            >
              {reviews.map((review, idx) => (
                <SwiperSlide key={idx}>
                  <ReviewCard data={review} />
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </section>
      </div>
      <div className={Styles.custom_review}>
        <Review data={customReview} />
      </div>
    </div>
  );
}
