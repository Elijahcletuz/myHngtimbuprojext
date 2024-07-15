import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Functioncart } from '../Functioncart';
import './AddToCartPage.css';

export function AddToCartPage({ cart, setCart }) {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    const API_BASE_URL = import.meta.env.VITE_BASE_URL;
    const ORGANIZATION_ID = import.meta.env.VITE_ORGANIZATION_ID;
    const APP_ID = import.meta.env.VITE_APP_ID;
    const API_KEY = import.meta.env.VITE_API_KEY;

    axios.get(`${API_BASE_URL}/products?organization_id=${ORGANIZATION_ID}&Appid=${APP_ID}&Apikey=${API_KEY}`)
      .then(response => {
        const sortedProducts = response.data.items.sort((a, b) => a.id - b.id);
        setProducts(sortedProducts);
      })
      .catch(error => {
        console.error('There was an error fetching the data!', error);
      });
  }, []);

  const bridalHeadgearProducts = products.slice(0, 24);
  const limitedEditionProducts = products.slice(24, 30);

  const paginatedProducts = bridalHeadgearProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (!products || products.length === 0) {
    return (
      <div className='loading'>
        <div className="loader"></div>
        Loading...
      </div>
    );
    
  }

  return (
    <div>
      <div className="general_container">
        <div className='bridal_heading'>Bridal Headgears</div>
        <div className='linecontainer'>
          <div className="line"></div>
        </div>
        <div className="group_container headband desktopbead">
          <div className="items-group item1">
            {paginatedProducts.slice(0, 4).map((product, index) => (
              <div key={index} className="beads_image_container">
                <Functioncart product={product} cart={cart} setCart={setCart} />
              </div>
            ))}
          </div>
          <div className="items-group item2">
            {paginatedProducts.slice(4, 8).map((product, index) => (
              <div key={index} className="beads_image_container">
                <Functioncart product={product} cart={cart} setCart={setCart} />
              </div>
            ))}
          </div>
        </div>
        <div className="pagination-controls">
          {[1, 2, 3].map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={currentPage === page ? 'active' : ''}
            >
              {page}
            </button>
          ))}
        </div>
        <div className="limited_heading">Limited Editions</div>
        <div className='limiteds'>
          <div className="group1">
            {limitedEditionProducts.slice(0, 3).map((product, index) => (
              <div key={index} className="limitimage">
                <Functioncart product={product} cart={cart} setCart={setCart} />
              </div>
            ))}
          </div>
          <div className="group1">
            {limitedEditionProducts.slice(3, 6).map((product, index) => (
              <div key={index} className="limitimage">
                <Functioncart product={product} cart={cart} setCart={setCart} />
              </div>
            ))}
          </div>
        </div>
      </div>
      <footer>
        <Link to='/' className='link-style'>
          <h1>YTBridal</h1>
        </Link>
        <div className="line3"></div>
        <h6>All rights reserved</h6>
      </footer>
    </div>
  );
}

AddToCartPage.propTypes = {
  cart: PropTypes.array.isRequired,
  setCart: PropTypes.func.isRequired,
};

export default AddToCartPage;
