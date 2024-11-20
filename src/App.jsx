import { Routes, Route, useLocation } from 'react-router-dom'
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './pages/NotFound'
import Footer from './components/common/Footer';
import Navbar from './components/common/Navbar';
import Home from './pages/Home';

function App() {
  const location = useLocation();

  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';
  return (
    <>
      {!isAuthPage && <Navbar/>}
      <div style={{minHeight:"calc(100vh - 143.8px)"}}>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
       {!isAuthPage && <Route path='*' element={<NotFound />} />}
      </Routes>
      </div>
      <Footer />
    </>
  )
}

export default App