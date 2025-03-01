import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/Login/LoginPage';
import LandingPage from './pages/Landing/LandingPage';
import CompanyRegisterPage from './pages/Register/CompanyRegisterPage';
import ShopkeeperRegisterPage from './pages/Register/ShopkeeperRegisterPage';
import Items from './pages/Shopkeeper/PlaceOrder/Items/Items';
import Cart from './pages/Shopkeeper/PlaceOrder/Cart/Cart';

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
    </Routes>
  </Router>
);

export default App;