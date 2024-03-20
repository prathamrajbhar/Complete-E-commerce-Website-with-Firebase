import React, { useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Signup from './pages/Signup';
import About from './pages/About';
import Contact from './pages/Contact';
import ProductDetails from './pages/ProductDetails';
import Footer from './components/Footer';
import Account from './pages/Account';
import Cart from './pages/Cart';
import Billing from './pages/Billing';
import Error from './pages/Error';
import Login from './pages/Login';
import OrderSuccess from './pages/OrderSuccess';
import Products from './pages/Products';

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/about" component={About} />
        <Route path="/signup" component={Signup} />
        <Route path="/login" component={Login} />
        <Route path="/contact" component={Contact} />
        <Route path="/account" component={Account} />
        <Route path="/productdetails/:productId" component={ProductDetails} />
        <Route path="/cart" component={Cart} />
        <Route path="/billing" component={Billing} />
        <Route path="/orderconfirmation" component={OrderSuccess} />
        <Route path="/products" component={Products} />
        <Route path="*" component={Error} />
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
