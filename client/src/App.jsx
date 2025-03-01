import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/Login/LoginPage';
import LandingPage from './pages/Landing/LandingPage';
import CompanyRegisterPage from './pages/Register/CompanyRegisterPage';
import ShopkeeperRegisterPage from './pages/Register/ShopkeeperRegisterPage';
import Items from './pages/Shopkeeper/PlaceOrder/Items/Items';
import Cart from './pages/Shopkeeper/PlaceOrder/Cart/Cart';
import MainPage from './pages/MainPage';
import Monthly from './pages/Shopkeeper/OrdersAndPaymentLog/Monthly/Monthly';
import Daily from './pages/Shopkeeper/OrdersAndPaymentLog/Daily/Daily';
import IndividualOrders from './pages/Shopkeeper/OrdersAndPaymentLog/IndividualOrders/IndividualOrders';

const Dashboard = () => <div>Welcome to the Dashboard!</div>;

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register/company" element={<CompanyRegisterPage />} />
      <Route path="/register/shopkeeper" element={<ShopkeeperRegisterPage />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/shopkeeper/placeorder/items" element={<Items/>}/>      
      <Route path="/shopkeeper/placeorder/cart" element={<Cart/>}/>      
      <Route path="/shopkeeper/placeorder" element={<MainPage />} />    
      <Route path="/shopkeeper/ordersandpaymentlog" element={<Monthly/>}/>      
      <Route path="/shopkeeper/ordersandpaymentlog/daily" element={<Daily/>}/>      
      <Route path="/shopkeeper/ordersandpaymentlog/individual" element={<IndividualOrders/>}/> 
    </Routes>
  </Router>
);

export default App;