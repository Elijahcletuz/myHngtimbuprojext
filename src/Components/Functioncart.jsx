

import { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import addcart from '../assets/basket.svg';

export function Functioncart({ product, cart, setCart }) {
  const [buttonText, setButtonText] = useState('Add to Cart');

  const handleClick = (e) => {
    e.preventDefault(); // Prevent navigation to single product page on add to cart
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      const updatedCart = cart.map(item =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
      setCart(updatedCart);
    } else {
      const newItem = { ...product, quantity: 1 };
      setCart([...cart, newItem]);
    }
    setButtonText('Added');
    setTimeout(() => {
      setButtonText('Add to Cart');
    }, 500);
  };

  const imageSource = product.photos && product.photos.length > 0
    ? `https://api.timbu.cloud/images/${product.photos[0].url}`
    : 'default-image.jpg';

  const productName = product.name || 'No Name';
  const productPrice = product.current_price?.[0]?.NGN?.[0] || '0';

  return (
    <div className="product-container">
      <Link to={`/single/${product.id}`} className="product-link">
        <img src={imageSource} alt={productName} onError={(e) => { e.target.src = 'default-image.jpg'; }} />
        <h2 className='phone_none'>{productName}</h2>
      </Link>
      <div className='phone_cart'>
        <Link to={`/single/${product.id}`} className="product-link">
          <h2>{productName}</h2>
        </Link>
        <button onClick={handleClick} className="add-to-cart-button">
          <div className="add-text add_cart_icon">
            <img src={addcart} alt="" />
            <h6>{buttonText}</h6>
          </div>
        </button>
      </div>
      <p>Price: ₦{productPrice}</p>
      <button onClick={handleClick} className="add-to-cart-button">
        <div className='phone_none'>
          <div className="add-text add_cart_icon">
            <img src={addcart} alt="" />
            <h6>{buttonText}</h6>
          </div>
        </div>
      </button>
    </div>
  );
}

Functioncart.propTypes = {
  product: PropTypes.object.isRequired,
  cart: PropTypes.array.isRequired,
  setCart: PropTypes.func.isRequired,
};

export default Functioncart;
