import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import './Singleproduct.css';
import decrease from '../../assets/Expand_down.svg';
import increase from '../../assets/Expand_up.svg';
import backbutton from '../../assets/backarrow.svg';

const Singleproduct = ({ cart, setCart }) => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    const API_BASE_URL = import.meta.env.VITE_BASE_URL;
    const ORGANIZATION_ID = import.meta.env.VITE_ORGANIZATION_ID;
    const APP_ID = import.meta.env.VITE_APP_ID;
    const API_KEY = import.meta.env.VITE_API_KEY;

    axios.get(
      `${API_BASE_URL}/products?id=${id}&organization_id=${ORGANIZATION_ID}&Appid=${APP_ID}&Apikey=${API_KEY}`
    )
      .then(response => {
        const productData = response.data.items.find(item => item.id === id);
        setProduct(productData);
      })
      .catch(error => {
        console.error('There was an error fetching the product data!', error);
      });
  }, [id]);

  const handleAddToCart = () => {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      const updatedCart = cart.map(item =>
        item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
      );
      setCart(updatedCart);
    } else {
      const newItem = { ...product, quantity };
      setCart([...cart, newItem]);
    }
  };

  const handleQuantityChange = (action) => {
    if (action === 'increase') {
      setQuantity(quantity + 1);
    } else if (action === 'decrease' && quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  const handleRemoveFromCart = () => {
    const updatedCart = cart.filter(item => item.id !== product.id);
    setCart(updatedCart);
  };

  if (!product) {
    return (
        <div className='loading'>
          <div className="loader"></div>
          Loading...
        </div>
      );
  }

  const imageSource = product.photos && product.photos.length > 0
    ? `https://api.timbu.cloud/images/${product.photos[0].url}`
    : 'default-image.jpg';

  return (
    <div className=' singlepp'>
        <Link to='/'>
            <div className='backbutton'>
              <img src={backbutton} alt="" />
            </div>
          </Link>
      <div className="single_product">
        <div className="single_left">
          <div>
            <img src={imageSource} alt={product.name} />
          </div>
        </div>
        <div className="single_right">
          <p className='productname'>{product.name}</p>
          <p className='pricss'> ₦{product.current_price?.[0]?.NGN?.[0]}</p>
          <p className='describe'>{product.description}</p>
          
         
         
          <ul className='size'>
            <p>Sizes</p>
                <li><button>15</button></li>
                <li><button>18</button></li>
                <li><button>21</button></li>
                <li><button>25</button></li>
                <li><button>30</button></li>
         </ul>
         
         
      
         <div className='all_quantity'>
         
            
          
            <div className='quannn'>
            <p className='quan'>Quantity:</p>
            <div className='quantity_container quantity_container2'>
            
            
            <h4 className='quantity'> {quantity}</h4>
            <div className='buttons_qty'>
            <button className="adjust" onClick={() => handleQuantityChange('increase')}>
                <div className='adjust_button'>
                <div className="adjust_up">
                    <img src={increase} alt="Increase" />
                </div>
                </div>
            </button>
            <button className="adjust" onClick={() => handleQuantityChange('decrease')}>
                <div className='adjust_button'>
                <div className="adjust_down">
                    <img src={decrease} alt="Decrease" />
                </div>
                </div>
            </button>
            </div>
        </div>

            </div>
            <p className='avail'> {product.available_quantity} units left</p>
         </div>

         <div className="lead">
            
          <button onClick={handleAddToCart} className='tue' >Add to Cart</button>
          <button onClick={handleRemoveFromCart} className='tue' >Remove from Cart</button>

         </div>


          <p className='notes'>Note: Choose the amount of quantity first before clicking on add to cart once.</p>
        </div>


      </div>
      <footer className='singlefooter'>
        <h6>All rights reserved</h6>
      </footer>
    </div>
  );
}

Singleproduct.propTypes = {
  cart: PropTypes.array.isRequired,
  setCart: PropTypes.func.isRequired,
};

export default Singleproduct;
