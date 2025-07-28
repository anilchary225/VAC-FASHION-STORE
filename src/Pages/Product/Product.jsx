import './Product.css';

import React, { useState } from 'react'
import ProductCarousel from '../../Components/Productcarousel/ProductCarousel';
import { useEffect,useContext } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { CartContext } from '../../Context/CartContext';


function Product() {




  const [product, setProduct] = useState({});
  const { id } = useParams();
  const { addToCart, removeFromCart, isInCart } = useContext(CartContext);

  const isAddedToCart = isInCart(id);

  const handleCartToggle = () => {
    if (isAddedToCart) {
      removeFromCart(id);
    } else {
      addToCart(id);
    }
  };
//   const [isAddedToCart, setIsAddedToCart] = useState(false);
//     const [product,setProduct] = useState({})
//     const {id}=useParams();

// const addToCart = (id) => {
//   const existing = localStorage.getItem('cartIds');
//   let cartIds = existing ? existing.split(',') : [];

//   if (!cartIds.includes(product.id.toString())) {
//     cartIds.push(product.id);
//     localStorage.setItem('cartIds', cartIds.join(','));
//     setIsAddedToCart(true);
//   } else {
//     cartIds = cartIds.filter(item => item !== product.id.toString());
//     localStorage.setItem('cartIds', cartIds.join(','));
//     setIsAddedToCart(false);
//   }
// };

useEffect(() => {
  async function productDetails() {
    if (id) {
      try {
      let product = await axios.get(`https://dummyjson.com/products/${id}`);
      setProduct(product.data);
    } catch (error) {
      console.error('Error fetching product:', error);
    }


      // const existing = localStorage.getItem('cartIds');
      // const cartIds = existing ? existing.split(',') : [];
      // if (cartIds.includes(product.id?.toString())) {
      //   setIsAddedToCart(true);
      // }else {
      //   setIsAddedToCart(false);
      // }
    }
  }
  productDetails();
}, [id]);



///bye now button function

const buyNow =()=>{
  const isLoggedIn = localStorage.getItem('isLoggedIn');
  if (isLoggedIn) {
    // Redirect to payment page
    const buyproductid = localStorage.setItem('buyproductid', product.id);
    const isBuyNowClicked = localStorage.setItem('isBuyNowClicked', true);
    window.location.href = `/checkout/${product.id}`;
  } else {
    // Redirect to login page
    window.location.href = '/login';
  }
  
}

    // Removed duplicate addtocart function
  

  // const addtocart = () => {
  //   const existing = localStorage.getItem('cartIds');
  //   const cartIds = existing ? existing.split(',') : [];

  //   if (!cartIds.includes(product.id?.toString())) {
  //     cartIds.push(product.id);
  //     localStorage.setItem('cartIds', cartIds.join(','));
  //     setIsAddedToCart(true);
  //   }
  // };

  return (
    <div className='productpage d-flex'>
      <div className='prodictimagediv halfdiv d-flex justify-content-center align-items-center'>
        <ProductCarousel images={product.images} />
      </div>
      <div className='productinfodiv halfdiv'>
        <div className='productinfo d-flex flex-column justify-content-center h-100 p-5'>
          <h1
            style={{
              fontSize: '68px',
              fontWeight: 'bold',
            }}
          >
            {product.title}
          </h1>
          <h6>{product.description}</h6>
          <p>
            Rating: {product.rating}{' '}
            <img
              src='../public/rating.png'
              width={'20px'}
              height={'20px'}
              style={{ marginLeft: '4px', padding: '0' }}
            />
          </p>
          <p>Category: {product.category} </p>
          <h4>Price : $ {product.price}</h4>
          <div className='d-flex'>
            <button
              className={`btn ${isAddedToCart ? 'btn-danger' : 'btn-primary'}`}
              style={{ width: '25%', margin: '2px' }}
              onClick={() => handleCartToggle(product.id)}
            >
              {isAddedToCart ? 'Remove from Cart' : 'Add to Cart'}
            </button>
            <button
              className='btn btn-primary'
              style={{ width: '25%', margin: '2px' }}
              onClick={buyNow}
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product
