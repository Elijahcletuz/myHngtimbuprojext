// import { useState } from 'react';
// import PropTypes from 'prop-types';
// import addcart from '../assets/basket.svg';

// export function Functioncart({ product, cart, setCart }) {
//   const [buttonText, setButtonText] = useState('Add to Cart');

//   const handleClick = () => {
//     const existingItem = cart.find(item => item.unique_id === product.unique_id);
//     if (existingItem) {
//       // Item is already in the cart, increase quantity
//       const updatedCart = cart.map(item =>
//         item.unique_id === product.unique_id ? { ...item, quantity: item.quantity + 1 } : item
//       );
//       setCart(updatedCart);
//     } else {
//       // Add new item to the cart
//       const newItem = { ...product, quantity: 1 };
//       setCart([...cart, newItem]);
//     }
//     setButtonText('Added');
//     setTimeout(() => {
//       setButtonText('Add to Cart');
//     }, 500);
//   };

//   const imageSource = product.photos && product.photos.length > 0
//     ? `https://api.timbu.cloud/images/${product.photos[0].url}`
//     : "default-image.jpg";

//   const productName = product.name || "No Name";
  
//   const productPrice = product.current_price && product.current_price.length > 0 && product.current_price[0].NGN && product.current_price[0].NGN.length > 0
//     ? product.current_price[0].NGN[0]
//     : "0";

//   return (
//     <div>
//       <img src={imageSource} alt={productName} onError={(e) => { e.target.src = 'default-image.jpg'; }} />
//       <h2 className='phone_none'>{productName}</h2>
//       <div className='phone_cart'>
//         <h2>{productName}</h2>
//         <button onClick={handleClick} className="add-to-cart-button">
//           <div className="add-text add_cart_icon">
//             <img src={addcart} alt="" />
//             <h6>{buttonText}</h6>
//           </div>
//         </button>
//       </div>
//       <p>Price: ₦{productPrice}</p>
//       <button onClick={handleClick} className="add-to-cart-button">
//         <div className='phone_none'>
//           <div className="add-text add_cart_icon">
//             <img src={addcart} alt="" />
//             <h6>{buttonText}</h6>
//           </div>
//         </div>
//       </button>
//     </div>
//   );
// }

// Functioncart.propTypes = {
//   product: PropTypes.object.isRequired,
//   cart: PropTypes.array.isRequired,
//   setCart: PropTypes.func.isRequired,
// };

// export default Functioncart;

import { useState } from 'react';
import PropTypes from 'prop-types';
import addcart from '../assets/basket.svg';

export function Functioncart({ product, cart, setCart }) {
  const [buttonText, setButtonText] = useState('Add to Cart');

  const handleClick = () => {
    const existingItem = cart.find(item => item.unique_id === product.unique_id);
    if (existingItem) {
      const updatedCart = cart.map(item =>
        item.unique_id === product.unique_id ? { ...item, quantity: item.quantity + 1 } : item
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
    <div>
      <img src={imageSource} alt={productName} onError={(e) => { e.target.src = 'default-image.jpg'; }} />
      <h2 className='phone_none'>{productName}</h2>
      <div className='phone_cart'>
        <h2>{productName}</h2>
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

