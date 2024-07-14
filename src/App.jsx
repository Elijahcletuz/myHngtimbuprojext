import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './Components/Navbar/Navbar';
import { Cart } from './Components/Cart/Cart';
import { AddToCartPage } from './Components/AddToCartPage/AddToCartPage';
import { useState } from 'react';
import Checkout from './Components/Checkout/Checkout.jsx';

function App() {
  const [cart, setCart] = useState([]);

  return (
    <Router>
      <Navbar cart={cart} />
      <Routes>
        <Route path='/checkout' element={<Checkout cart={cart} setCart={setCart} />} />
        <Route path='/Cart' element={<Cart cart={cart} setCart={setCart} />} />
        <Route path='/' element={<AddToCartPage cart={cart} setCart={setCart} />} />
      </Routes>
    </Router>
  );
}

export default App;
