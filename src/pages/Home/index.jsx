import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Home/Header";
import Deals from "../../components/Home/Deals";
import PopularCategories from "../../components/Home/PopularCategories";
import PopularRestaurants from "../../components/Home/PopularRestaurants";
import AdCenter from "../../components/Home/AdCenter";
import Collab from "../../components/Home/Collab";
import About from "../../components/Home/About";
import Stats from "../../components/Home/Stats";
import { isTokenExpired, logout } from "../../slices/authSlice";
export default function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, token } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!token || !user || isTokenExpired(token)) {
      navigate('/login');
      dispatch(logout());
    }
  }, [token, user, navigate, dispatch]);
  return (
    <div className="container">
        <Header/>
        <Deals/>
        <PopularCategories/>
        <PopularRestaurants/>
        <AdCenter/>
        <Collab/>
        <About/>
        <Stats/>
    </div>
  )
}
