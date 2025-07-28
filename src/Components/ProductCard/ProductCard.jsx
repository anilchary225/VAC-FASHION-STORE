import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
// import { useState,useEffect } from 'react';
import { useContext } from 'react';
import { CartContext } from '../../Context/CartContext';

function ProductCard({product}) {



  const { addToCart, removeFromCart, isInCart } = useContext(CartContext);
  
  const isAddedToCart = isInCart(product.id);

  const handleCartToggle = () => {
    if (isAddedToCart) {
      removeFromCart(product.id);
    } else {
      addToCart(product.id);
    }
  };


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
    // const [isAddedToCart, setIsAddedToCart] = useState(false);
    // // const storedIds = localStorage.getItem("cartIds")?.split(",").map(id => id.trim());
    
    // useEffect(() => {
    //   const existing = localStorage.getItem('cartIds');
    //   const cartIds = existing ? existing.split(',') : [];
    //   setIsAddedToCart(cartIds.includes(product.id.toString()));
    // }, [product.id]);

      // const addtocart = () => {
      //   const existing = localStorage.getItem('cartIds');
      //   const cartIds = existing ? existing.split(',') : [];
    
      //   if (!cartIds.includes(product.id?.toString())) {
      //     cartIds.push(product.id);
      //     localStorage.setItem('cartIds', cartIds.join(','));
      //     setIsAddedToCart(true);
      //   }
      // };

      // const handleCartToggle = () => {
      //   const existing = localStorage.getItem('cartIds');
      //   let cartIds = existing ? existing.split(',') : [];
    
      //   if (cartIds.includes(product.id.toString())) {
      //     // Remove from cart
      //     cartIds = cartIds.filter(id => id !== product.id.toString());
      //     localStorage.setItem('cartIds', cartIds.join(','));
      //     setIsAddedToCart(false);
      //   } else {
      //     // Add to cart
      //     cartIds.push(product.id.toString());
      //     localStorage.setItem('cartIds', cartIds.join(','));
      //     setIsAddedToCart(true);
      //   }
      // };
    
  return (
    
    <Card style={{ width: '18rem' }} >
        <Link to={'/Product/'+product.id} style={{textDecoration:'none',color:'black'}}>
      <Card.Img variant="top" src={product.thumbnail} />
      </Link>
      <hr/>
      <Card.Body>
        <Card.Title>{product.title}</Card.Title>
        <Card.Text>
          Price: ${product.price}
        </Card.Text>
        <Card.Text>
          Discount: {product.discountPercentage} %
        </Card.Text>
        <Card.Text>
            Rating: {product.rating} <img src='/rating.png' width={'20px'} height={'20px'} style={{marginLeft:'4px',padding:'0'}}/>
            </Card.Text>
            <button
              className={`btn ${isAddedToCart ? 'btn-danger' : 'btn-primary'}`}
              style={{ width: '100%', margin: '2px' }}
              onClick={handleCartToggle}
              
            >
              {isAddedToCart ? 'Remove from cart' : 'Add to Cart'}
            </button>
            
        <Button variant="outline-primary" onClick={buyNow} style={{width:"100%", margin:'2px'}} >Buy Now</Button>
      </Card.Body>
      
    </Card>
    
  );
}

export default ProductCard;