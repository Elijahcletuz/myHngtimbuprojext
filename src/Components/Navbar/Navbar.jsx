// import './Navbar.css';
// import { Link } from 'react-router-dom';
// import PropTypes from 'prop-types';
// import search from '../../assets/search.svg';
// import basket from '../../assets/basket.svg';

// export function Navbar({ cart }) {
//   // Calculate the total number of items in the cart
//   const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

//   return (
//     <nav>
//       <Link to='/' className='link-style'>
//         <h1>YTBridal</h1>
//       </Link>
//       <div className="icons">
//         <img src={search} alt="" />
//         <div className='carts_container'>
//           <Link to='/Cart'><img src={basket} alt="" /></Link>
//           <div className="cart_count">{totalItems}</div>
//         </div>
//       </div>
//     </nav>
//   );
// }

// // Define prop types for Navbar
// Navbar.propTypes = {
//   cart: PropTypes.arrayOf(PropTypes.shape({
//     productpicture: PropTypes.string,
//     productpicturePhone: PropTypes.string,
//     name: PropTypes.string.isRequired,
//     current_price: PropTypes.array.isRequired,
//     quantity: PropTypes.number.isRequired
//   })).isRequired
// };

// export default Navbar;


import './Navbar.css';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import search from '../../assets/search.svg';
import basket from '../../assets/basket.svg';

export function Navbar({ cart }) {
  // Calculate the total number of items in the cart
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav>
      <Link to='/' className='link-style'>
        <h1>YTBridal</h1>
      </Link>
      <div className="icons">
        <img src={search} alt="" />
        <div className='carts_container'>
          <Link to='/Cart'><img src={basket} alt="" /></Link>
          <div className="cart_count">{totalItems}</div>
        </div>
      </div>
    </nav>
  );
}

// Define prop types for Navbar
Navbar.propTypes = {
  cart: PropTypes.arrayOf(PropTypes.shape({
    productpicture: PropTypes.string,
    productpicturePhone: PropTypes.string,
    name: PropTypes.string.isRequired,
    current_price: PropTypes.array.isRequired,
    quantity: PropTypes.number.isRequired
  })).isRequired
};

export default Navbar;
