import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';
import './App.css';
import Products from './components/Products/Products';
import Cart from './components/Cart/Cart';
import AddProduct from './components/Products/AddProduct';
import CartCheckout from './components/Cart/CartCheckout';
import Wishlist from './components/Products/Wishlist/Wishlist';
import ProductView from './components/Products/ProductView';

const App: React.FC = () => {
  return (
    <Router>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">E-Commerce</Link>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to="/products">Products</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/cart">Cart</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/checkout">Checkout</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/wishlist">Wishlist</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/products/add" element={<AddProduct />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductView />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<CartCheckout />} />
        <Route path="/wishlist" element={<Wishlist />} />
      </Routes>
    </Router>
  );
};

export default App;
