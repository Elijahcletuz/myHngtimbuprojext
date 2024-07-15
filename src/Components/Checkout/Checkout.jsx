import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import './Checkout.css';
import visa from '../../assets/Visa.svg';
import mastercard from '../../assets/mastercard.svg';
import paypal from '../../assets/paypal.svg';
import check from '../../assets/charm_circle-tick.svg';
import close from '../../assets/Close_square.svg';
import decrease from '../../assets/Expand_down.svg';
import increase from '../../assets/Expand_up.svg';
import backbutton from '../../assets/backarrow.svg';

const Checkout = ({ cart: initialCart, setCart }) => {
  const [cartLocal, setCartLocal] = useState(initialCart);
  const [subtotal, setSubtotal] = useState(0);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const newSubtotal = cartLocal.reduce((total, item) => total + (item.current_price[0].NGN[0] * item.quantity), 0);
    setSubtotal(newSubtotal);
  }, [cartLocal]);

  const deliveryFee = cartLocal.length === 0 ? 0 : 2000 + (Object.keys(cartLocal.reduce((acc, item) => {
    acc[item.name] = true;
    return acc;
  }, {})).length - 1) * 500;

  const totalWithDelivery = subtotal + deliveryFee;

  const handleQuantityChange = (itemId, action) => {
    const item = cartLocal.find(item => item.unique_id === itemId);
    const newQuantity = action === 'increase' ? item.quantity + 1 : item.quantity - 1;

    if (newQuantity >= 0) { // Allow quantity to be zero
      const updatedCart = cartLocal.map(item => item.unique_id === itemId ? { ...item, quantity: newQuantity } : item);
      setCartLocal(updatedCart);
      setCart(updatedCart); // Update global cart
    }
  };

  const handleRemoveItem = (itemId) => {
    const updatedCart = cartLocal.filter(item => item.unique_id !== itemId);
    setCartLocal(updatedCart);
    setCart(updatedCart); // Update global cart
  };

  const handleCheckout = () => {
    setShowSuccessMessage(true);

    // Clear the cart
    setCart([]);
    setCartLocal([]);

    // Redirect to AddToCartPage after 2 seconds
    setTimeout(() => {
      navigate('/');
    }, 2000);
  };

  return (
    <div>
      {showSuccessMessage && (
        <div className="success-message">
          You have successfully completed payment for this product.
        </div>
      )}
      {cartLocal.length === 0 ? (
        <div className='nothing'>Nothing is in the cart</div>
      ) : (
        <div className='paycontainer'>
          <Link to='/Cart'>
            <div className='backbutton'>
              <img src={backbutton} alt="" />
            </div>
          </Link>
          <div className="flex_pay">
            <div className="flex_Pay_left">
              <div className="pay_heading">
                <h1>Shopping Cart</h1>
                <p>You have {cartLocal.length} items in your cart</p>
              </div>
              <div className="itempreview">
                {cartLocal.map((item, index) => {
                  const imageSource = item.photos && item.photos.length > 0
                    ? `https://api.timbu.cloud/images/${item.photos[0].url}`
                    : 'default-image.jpg';
                  return (
                    <div className='children' key={index}>
                      <img src={imageSource} alt={item.name} onError={(e) => { e.target.src = 'default-image.jpg'; }} className='main_image' />
                      <div className='quantity_container'>
                        <h4 className='quantity'>{item.quantity}</h4>
                        <div className='buttons_qty'>
                          <button className="adjust" onClick={() => handleQuantityChange(item.unique_id, 'increase')}>
                            <div className='adjust_button'>
                              <div className="adjust_up">
                                <img src={increase} alt="Increase" />
                              </div>
                            </div>
                          </button>
                          <button className="adjust" onClick={() => handleQuantityChange(item.unique_id, 'decrease')}>
                            <div className='adjust_button'>
                              <div className="adjust_down">
                                <img src={decrease} alt="Decrease" />
                              </div>
                            </div>
                          </button>
                        </div>
                      </div>
                      <p className='push1'>{item.name}</p>
                      <p className='push2'>₦{(item.current_price[0].NGN[0] * item.quantity).toLocaleString()}</p>
                      <div className='push3'>
                        <button className="remove" onClick={() => handleRemoveItem(item.unique_id)}>
                          <img src={close} alt="Close" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="payment_info">
              <h1>Payment Info.</h1>
              <div className='payment_phone'>
                <h4>You’re almost there!</h4>
                <span>Provide your credit card information to complete your purchase.</span>
              </div>
              <h3>Payment method</h3>
              <div className='methods'>
                <div className='bank bank1'>
                  <img src={visa} alt="" />
                  <label htmlFor="visa"></label>
                  <input type="radio" name="payment-method" id="visa" />
                </div>
                <div className='bank'>
                  <img src={mastercard} alt="" />
                  <label htmlFor="mastercard"></label>
                  <input type="radio" name="payment-method" id="mastercard" />
                </div>
                <div className='bank'>
                  <img src={paypal} alt="" />
                  <label htmlFor="paypal"></label>
                  <input type="radio" name="payment-method" id="paypal" />
                </div>
              </div>
              <form action="">
                <div className="form_item">
                  <label htmlFor="name">Cardholder’s name</label>
                  <input type="text" id="name" placeholder='Blue Oma'/>
                </div>
                <div className="form_item">
                  <label htmlFor="cardNumber">Card number</label>
                  <input type="text" id="cardNumber" placeholder='1111 2222 3333 4444' />
                </div>
                <div className="flexboth">
                  <div className="form_item1 expiry">
                    <label htmlFor="expiry">Expiry date</label>
                    <input type="text" id="expiry" placeholder='23/2027'/>
                  </div>
                  <div className="form_item1 cvv">
                    <label htmlFor="cvv">CVV</label>
                    <input type="text" id="cvv" placeholder='123' />
                  </div>
                </div>
                <div className="line4"></div>
                <div className="form_total form_total1">
                  <p>Subtotal</p>
                  <p>₦{subtotal.toLocaleString()}</p>
                </div>
                <div className="form_total">
                  <p>Delivery</p>
                  <p>₦{deliveryFee.toLocaleString()}</p>
                </div>
                <div className="form_total">
                  <p>Total</p>
                  <p>₦{totalWithDelivery.toLocaleString()}</p>
                </div>
                <div className="later">
                  <img src={check} alt="" />
                  <p>Save details for future payments</p>
                </div>
              </form>
              <div className="butch_container">
                <button className='butch' onClick={handleCheckout}>Checkout</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Define prop types for Checkout
Checkout.propTypes = {
  cart: PropTypes.arrayOf(
    PropTypes.shape({
      unique_id: PropTypes.string.isRequired,
      productpicture: PropTypes.string,
      productpicturePhone: PropTypes.string,
      name: PropTypes.string.isRequired,
      current_price: PropTypes.arrayOf(
        PropTypes.shape({
          NGN: PropTypes.arrayOf(
            PropTypes.number
          ).isRequired
        })
      ).isRequired,
      quantity: PropTypes.number.isRequired
    })
  ).isRequired,
  setCart: PropTypes.func.isRequired
};

export default Checkout;
