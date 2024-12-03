import Styles from './CustomerReviews.module.css';
import Back from '../../../assets/images/Back.svg';
import ReviewCard from './ReviewCard';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { useRef } from 'react';
import Review from '../../common/Review';

export default function CustomerReviews() {
  const swiperRef = useRef(null);

  const slideNext = () => {
    if (swiperRef.current) {
      swiperRef.current.slideNext(); // Move to the next slide
    }
  };

  const slidePrev = () => {
    if (swiperRef.current) {
      swiperRef.current.slidePrev(); // Move to the previous slide
    }
  };
  
  const customReview = {
    rating:3.5,
    review:4500
  }

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
          <Swiper
            onSwiper={(swiper) => (swiperRef.current = swiper)} // Store Swiper instance in ref
            loop={true}
            pagination={{ clickable: true }}
            breakpoints={{
              1024: {
                slidesPerView: 3,
                spaceBetween: 30,
              },
              992: {
                slidesPerView: 2,
                spaceBetween: 40,
              },
              768: {
                slidesPerView: 1,
                spaceBetween: 20,
              },
            }}
          >
            {[...Array(5)].map((_, idx) => (
              <SwiperSlide key={idx}>
                <ReviewCard />
              </SwiperSlide>
            ))}
          </Swiper>
        </section>
      </div>
      <div className={Styles.custom_review}>
        <Review data={customReview}/>
      </div>
    </div>
  );
}
