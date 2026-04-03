import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './index.css';
import './App.css';
import reportWebVitals from './reportWebVitals';
import Home from './components/Home';
import MenuPage from './components/MenuPage';
import BookTable from './components/BookTable';
import About from './components/About';
import ScrollToTop from './components/ScrollToTop';
import Auth from './components/Auth';
import CartPage from './components/CartPage';
import OrderSuccess from './components/OrderSuccess';
import MyOrders from './components/MyOrders';
import { AuthProvider } from './context/AuthContext';

// Admin Components
import AdminLayout from './admin/AdminLayout';
import AdminDashboard from './admin/AdminDashboard';
import FoodManagement from './admin/FoodManagement';
import BookingList from './admin/BookingList';
import OrderManagement from './admin/OrderManagement';

const App = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-out',
    });
  }, []);

  return (
    <React.StrictMode>
      <AuthProvider>
          <Router>
            <ScrollToTop />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/menu" element={<MenuPage />} />
              <Route path="/book" element={<BookTable />} />
              <Route path="/about" element={<About />} />
              <Route path="/login" element={<Auth />} />
              <Route path="/register" element={<Auth />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/orders" element={<MyOrders />} />

              <Route path="/order-success" element={<OrderSuccess />} />

              {/* Admin Routes */}
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<AdminDashboard />} />
                <Route path="food" element={<FoodManagement />} />
                <Route path="bookings" element={<BookingList />} />
                <Route path="orders" element={<OrderManagement />} />
              </Route>
            </Routes>
          </Router>
      </AuthProvider>
    </React.StrictMode>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

reportWebVitals();
