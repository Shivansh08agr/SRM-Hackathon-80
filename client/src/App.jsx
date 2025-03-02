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
import SelectCompanies from './pages/Shopkeeper/AddInventory/SelectCompanies/SelectCompanies';
import SelectItems from './pages/Shopkeeper/AddInventory/SelectItems/SelectItems';
import PlaceOrder from './pages/Shopkeeper/AddInventory/PlaceOrder/PlaceOrder';

const Dashboard = () => <div>Welcome to the Dashboard!</div>;

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register/company" element={<CompanyRegisterPage />} />
      <Route path="/register/shopkeeper" element={<ShopkeeperRegisterPage />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/shopkeeper/placeorder/items" element={<Items />} />
      <Route path="/shopkeeper/placeorder/cart" element={<Cart />} />
      <Route path="/shopkeeper/placeorder" element={<MainPage />} />
      <Route path="/shopkeeper/ordersandpaymentlog" element={<Monthly />} />
      <Route path="/shopkeeper/ordersandpaymentlog/daily" element={<Daily />} />
      <Route path="/shopkeeper/ordersandpaymentlog/individual" element={<IndividualOrders />} />
      <Route path="/shopkeeper/addinventory/selectcompanies" element={<SelectCompanies />} />
      <Route path="/shopkeeper/addinventory/selectitems" element={<SelectItems />} />
      <Route path="/shopkeeper/addinventory/placeorder" element={<PlaceOrder />} />
    </Routes>
  </Router>
);

export default App;