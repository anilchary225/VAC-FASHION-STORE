import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

function ProductCard({ categoryProduct }) {
    const [isAddedToCart, setIsAddedToCart] = useState(false);

    // const addtocart = () => {
    //     const existing = localStorage.getItem('cartIds');
    //     const cartIds = existing ? existing.split(',') : [];

    //     if (!cartIds.includes(categoryProduct.id?.toString())) {
    //         cartIds.push(categoryProduct.id);
    //         localStorage.setItem('cartIds', cartIds.join(','));
    //         setIsAddedToCart(true);
    //     }
    // };

    useEffect(() => {
      const existing = localStorage.getItem('cartIds');
      const cartIds = existing ? existing.split(',') : [];
      setIsAddedToCart(cartIds.includes(categoryProduct.id.toString()));
    }, [categoryProduct.id]);

    const handleCartToggle = () => {
        const existing = localStorage.getItem('cartIds');
        let cartIds = existing ? existing.split(',') : [];
    
        if (cartIds.includes(categoryProduct.id.toString())) {
          // Remove from cart
          cartIds = cartIds.filter(id => id !== categoryProduct.id.toString());
          localStorage.setItem('cartIds', cartIds.join(','));
          setIsAddedToCart(false);
        } else {
          // Add to cart
          cartIds.push(categoryProduct.id.toString());
          localStorage.setItem('cartIds', cartIds.join(','));
          setIsAddedToCart(true);
        }
      };


      const buyNow =()=>{
        const isLoggedIn = localStorage.getItem('isLoggedIn');
        if (isLoggedIn) {
          // Redirect to payment page
          const buyproductid = localStorage.setItem('buyproductid', categoryProduct.id);
          const isBuyNowClicked = localStorage.setItem('isBuyNowClicked', true);
          window.location.href = `/checkout/${categoryProduct.id}`;
        } else {
          // Redirect to login page
          window.location.href = '/login';
        }
        
      }

    return (
        <>
        
        <Card style={{ width: '18rem' }}>
            <Link
                to={'/Product/' + categoryProduct.id}
                style={{ textDecoration: 'none', color: 'black' }}
            >
                <Card.Img variant="top" src={categoryProduct.thumbnail} />
            </Link>
            <hr />
            <Card.Body>
                <Card.Title>{categoryProduct.title}</Card.Title>
                <Card.Text>
                    Price: ${categoryProduct.price}
                </Card.Text>
                <Card.Text>
                    Discount: {categoryProduct.discountPercentage} %
                </Card.Text>
                <Card.Text>
                    
                        Rating: {categoryProduct.rating}{' '}
                        <img
                            src="/rating.png"
                            width={'20px'}
                            height={'20px'}
                            style={{ marginLeft: '4px', padding: '0' }}
                            alt="Rating"
                        />
                    
                </Card.Text>
                <button
                    className={`btn ${isAddedToCart ? 'btn-danger' : 'btn-primary'}`}
                    style={{ width: '100%', margin: '2px' }}
                    onClick={handleCartToggle}
                    
                >
                    {isAddedToCart ? 'Remove from cart' : 'Add to Cart'}
                </button>
                <Button variant="outline-primary" onClick={buyNow} style={{ width: '100%', margin: '2px' }}>
                    Buy Now
                </Button>
            </Card.Body>
        </Card>
        </>
    );
}

export default ProductCard;