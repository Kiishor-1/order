import { Routes, Route, useLocation } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import Footer from "./components/common/Footer";
import Navbar from "./components/common/Navbar";
import Home from "./pages/Home";
import Product from "./pages/Product";
import Checkout from "./pages/Checkout";
import OrderPlaced from "./pages/OrderPlaced";
import Profile from "./pages/Profile";
import Address from "./pages/Address";
import PaymentMethod from "./pages/PaymentMethod";
import { useState, useEffect } from "react";

function App() {
  const location = useLocation();
  const [openModal, setOpenModal] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/register";

  // Dynamically track viewport size
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {!isAuthPage && (
        <Navbar
          openModal={openModal}
          setOpenModal={setOpenModal}
          isMobile={isMobile}
        />
      )}
      <div style={{ minHeight: "calc(100vh - 417.2px)" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/restaurants/:id"
            element={
              <Product
                openModal={openModal}
                setOpenModal={setOpenModal}
                isMobile={isMobile}
              />
            }
          />
          <Route
            path="/cart/:id/:sharedCartId"
            element={
              <Product
                openModal={openModal}
                setOpenModal={setOpenModal}
                isMobile={isMobile}
              />
            }
          />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-placed" element={<OrderPlaced />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/address" element={<Address />} />
          <Route path="/payment-methods" element={<PaymentMethod />} />
          {!isAuthPage && <Route path="*" element={<NotFound />} />}
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
