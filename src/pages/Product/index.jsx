import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Styles from './Product.module.css';
import CardContainer from '../../components/Product/CardContainer';
import Basket from '../../assets/images/Basket.png';
import Remove from '../../assets/images/Remove.svg';
import PopularRestaurants from '../../components/Home/PopularRestaurants';
import { fetchRestaurantDetails } from '../../slices/restaurantSlice'; // Action to fetch restaurant by ID
import { fetchCart, removeItemFromCart, updateCartQuantity } from '../../slices/cartSlice'; // asyncThunk actions
import Offers from '../../components/Product/Offers';
import ProductDetails from '../../components/Product/ProductDetails';
import FoodCategory from '../../components/Product/FoodCategory';
import Information from '../../components/Product/Information';
import CustomerReviews from '../../components/Product/CustomerReviews';
import Map from '../../components/Product/Map';
import MiniBasket from '../../components/Product/MiniBasket';
import { fetchSharedCart } from '../../services/operations/sharableCartApi';
import Spinner from '../../components/common/Spinner'

export default function Product({ openModal, setOpenModal, isMobile }) {
    const { id, sharedCartId } = useParams(); // Get restaurant ID from URL
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { currentRestaurant: restaurant, loading } = useSelector((state) => state.restaurant);
    const { items, totalPrice } = useSelector((state) => state.cart);
    const { user, token } = useSelector((state) => state.auth);
    const [onUpdate, setOnUpdate] = useState(true);

    const itemTypes = ['Burgers', 'Fries', 'Cold Drinks'];

    const [search, setSearch] = useState('');
    const handleSearch = (e) => {
        setSearch(e.target.value.toLowerCase());
    };

    useEffect(() => {
        if (id) {
            dispatch(fetchRestaurantDetails(id))
                .unwrap()
                .then((response) => {
                    console.log("Restaurant details fetched successfully:", response);
                })
                .catch((error) => {
                    console.error("Error fetching restaurant details:", error);
                    navigate("/");
                });
        }
    }, [id, dispatch, navigate]);

    useEffect(() => {
        if (onUpdate) {
            dispatch(fetchCart());
            setOnUpdate(false);
        }
    }, [dispatch, onUpdate]);

    useEffect(() => {
        if (!isMobile && items.length > 0) {
            setOpenModal(true);
        }
    }, [items, isMobile, setOpenModal]);

    // console.log('items', items)

    const filterFoodItemsByCategory = (itemType) => {
        return restaurant?.foodItems?.filter(
            (food) =>
                food.item === itemType &&
                (!search || food.name.toLowerCase().includes(search))
        ) || [];
    };

    const handleRemoveFromCart = (id) => {
        dispatch(removeItemFromCart({ id }));
        setOnUpdate(true)
    };

    const closeCart = () => {
        setOpenModal(false);
    }


    const [sharedCartFetched, setSharedCartFetched] = useState(false);

    useEffect(() => {
        if (sharedCartId && !sharedCartFetched) {
            dispatch(fetchSharedCart(sharedCartId))
                .then(() => {
                    setSharedCartFetched(true);
                    navigate(`/restaurants/${id}`);
                })
                .catch((err) => console.log(err));
        }
    }, [sharedCartId, sharedCartFetched, dispatch, id, navigate]);

    if (loading) {
        return <Spinner />
    }


    return (
        <div className={Styles.product_and_cart}>
            <div className={`${Styles.product_pag} container`}>
                <ProductDetails restaurant={restaurant} />
            </div>
            <div className="container">
                <section className={Styles.search_container}>
                    <h2 className={Styles.head}>
                        All Offers from {restaurant?.name || "Restaurant"}
                    </h2>
                    <input
                        value={search}
                        onChange={handleSearch}
                        type="text"
                        placeholder="Search"
                        className={Styles.search}
                    />
                </section>
            </div>
            <FoodCategory />
            <div className={`${Styles.product_page} container`}>
                <main className={Styles.product_menu}>
                    <Offers />
                    <div>
                        {loading ? (
                            <div className={Styles.loading}>Loading...</div>
                        ) : (
                            itemTypes.map((item, index) => (
                                <CardContainer
                                    key={index}
                                    item={item}
                                    restaurantId={restaurant?._id}
                                    data={filterFoodItemsByCategory(item)}
                                />
                            ))
                        )}
                    </div>
                </main>

                {items.length > 0 && openModal && (
                    <MiniBasket
                        isMobile={isMobile}
                        closeCart={closeCart}
                        handleRemoveFromCart={handleRemoveFromCart}
                        restaurantId={restaurant?._id}
                        items={items || []}
                        totalPrice={totalPrice}
                    />
                )}
            </div>
            <div className="container">
                <Information />
            </div>
            <CustomerReviews />
            <div className="container">
                <PopularRestaurants heading={"Similar Restaurants"} />
                <Map listing={restaurant || {}} />
            </div>
        </div>
    );
}
