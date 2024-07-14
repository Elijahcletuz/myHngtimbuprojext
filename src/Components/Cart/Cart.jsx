import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import increase from '../../assets/Expand_down.svg';
import decrease from '../../assets/Expand_up.svg';
import close from '../../assets/Close_square.svg';
import arrow from '../../assets/arrowright.png';
import './Cart.css';

export function Cart({ cart, setCart }) {
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const total = cart.reduce((sum, item) => sum + item.current_price[0].NGN[0] * item.quantity, 0);
    setTotalPrice(total);
  }, [cart]);

  const handleQuantityChange = (itemId, action) => {
    const item = cart.find(item => item.unique_id === itemId);
    const newQuantity = action === 'increase' ? item.quantity + 1 : item.quantity - 1;

    if (newQuantity > 0) {
      const updatedCart = cart.map(item => item.unique_id === itemId ? { ...item, quantity: newQuantity } : item);
      setCart(updatedCart);
    }
  };

  const handleRemoveItem = (itemId) => {
    const updatedCart = cart.filter(item => item.unique_id !== itemId);
    setCart(updatedCart);
  };

  const deliveryFee = 2000 + (Object.keys(cart.reduce((acc, item) => {
    acc[item.name] = true;
    return acc;
  }, {})).length - 1) * 500;

  const totalWithDelivery = totalPrice + deliveryFee;

  return (
    <div className='cart_container'>
      <div className='cart_header'>Your Shopping Cart</div>
      <div className='phonecart_header'>Shopping Cart</div>
      {cart.length > 0 ? (
        <>
          <div className="cart_item_titles">
            <ul>
              <li className='productcart'>Product</li>
              <li className='spacecart'></li>
              <li className='cart_price'>Price</li>
              <li className='cart_quantity'>Qty</li>
              <li className='total_cart'>Total</li>
            </ul>
          </div>
          {cart.map((item, index) => {
            const imageSource = item.photos && item.photos.length > 0
              ? `https://api.timbu.cloud/images/${item.photos[0].url}`
              : 'default-image.jpg';
            return (
              <div key={index} className='design_cart'>
                <img src={imageSource} alt={item.name} onError={(e) => { e.target.src = 'default-image.jpg'; }} className='cart_image' />
                <h2>{item.name}</h2>
                <h3>{item.current_price[0].NGN[0].toLocaleString()}</h3>
                <div className='quantity_container'>
                  <h4 className='quantity'>{item.quantity}</h4>
                  <div className='buttons_qty'>
                    <button className="adjust" onClick={() => handleQuantityChange(item.unique_id, 'increase')}>
                      <div className='adjust_button'>
                        <div className="adjust_up">
                          <img src={decrease} alt="Increase" />
                        </div>
                      </div>
                    </button>
                    <button className="adjust" onClick={() => handleQuantityChange(item.unique_id, 'decrease')}>
                      <div className='adjust_button'>
                        <div className="adjust_down">
                          <img src={increase} alt="Decrease" />
                        </div>
                      </div>
                    </button>
                  </div>
                </div>
                <p>₦{(item.current_price[0].NGN[0] * item.quantity).toLocaleString()}</p>
                <img src={close} alt="Close" className="close_button" onClick={() => handleRemoveItem(item.unique_id)} />
              </div>
            );
          })}
          <div className='checkout_container'>
            <div className='discount'>
              <h3>Do you have a Discount?</h3>
              <button className='discount_button'>
                Enter Your Coupon Code <img src={arrow} alt="" className='aroow_image' />
              </button>
            </div>
            <div className="checkout">
              <h3>Delivery</h3>
              <button className='indrive'>
                InDrive <span>-₦{deliveryFee.toLocaleString()}</span>
                <img src={increase} alt="Decrease" />
              </button>
              <h3 className='flex_total totals'>Total <span>₦{totalWithDelivery.toLocaleString()}</span></h3>
              <Link to='/checkout' state={{ cart, totalPrice: totalWithDelivery }}>
                <button className='proceed'>Proceed to Checkout</button>
              </Link>
            </div>
          </div>
        </>
      ) : (
        <div className="empty_cart_message">Your cart is empty.</div>
      )}
    </div>
  );
}

Cart.propTypes = {
  cart: PropTypes.array.isRequired,
  setCart: PropTypes.func.isRequired,
};

export default Cart;
