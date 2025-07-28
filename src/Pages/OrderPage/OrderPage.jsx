import React from 'react'
import { useContext } from "react";
import { Link } from 'react-router-dom';
import '../CartPage/Cart.css';
import Button from 'react-bootstrap/Button';
import { CartContext } from "../../Context/CartContext";

function OrderPage() {
    const { cartItems, totalPrice, quantities } = useContext(CartContext);
    const date = localStorage.getItem('orderDate');
    const time = localStorage.getItem('orderTime');
    const orderWeekday = localStorage.getItem("orderWeekday");

      const cancelOrder=()=>{
        alert("Order Cancelled successfully")
        localStorage.removeItem('orderDate');
        localStorage.removeItem('orderTime');
        localStorage.removeItem('orderWeekday');

        window.location.href ='/Mycart'
      }
  return (
    
    <div className="cart-container d-flex flex-column" style={{ marginTop: "57px",height: "100%", paddingBottom: "100px" }}>
      <div className="cart-left w-100">
        <h1 className="text-center">Order Summary</h1>
        <hr />
        
        {cartItems.length > 0 ? (
          <p className="text-center">🕒 Ordered on <strong>{orderWeekday}</strong>, {date} at {time}</p>
        ) : (
          <p className="text-center">There are no products are ordered</p>
        )}
        <div className='d-flex justify-content-evenly align-items-center '>
        
        
        </div>
        <div className="carts w-90  ">
          {cartItems &&
            cartItems.length > 0 &&
            cartItems.map((cart) => {
              return (
                <div key={cart.id} className="cart d-flex  w-100 ">
                  <div className="cart-img w-25">
                    <img src={cart.thumbnail} width="200px" />
                  </div>
                  <div className="cart-details d-flex justify-content-center  flex-column w-50 py-3">
                    <h1>{cart.title}</h1>
                    <p>{cart.description}</p>
                    <p>
                      Rating:{cart.rating}{" "}
                      <img
                        src="rating.png"
                        width={"20px"}
                        height={"20px"}
                        style={{ marginLeft: "4px", padding: "0" }}
                      />
                    </p>
                    
                  </div>
                  <div className="cart-price  d-flex  flex-column  w-25 p-3">
                    <h2 className="price-header">Price: $ {cart.price}</h2>
                    <p>Quantity: {quantities[String(cart.id)] || 1}</p>
                    {/* <button
                      className="btn btn-danger w-100"
                      onClick={() => {
                        const updatedCartDetails = cartDetails.filter(
                          (item) => item.id !== cart.id
                        );
                        setCartDetails(updatedCartDetails);
                        const updatedIds = updatedCartDetails
                          .map((item) => item.id)
                          .join(",");
                        localStorage.setItem("cartIds", updatedIds);
                      }}
                    >
                      Remove
                    </button> */}
                  </div>
                </div>
              );
            })}
        </div>
      </div>
      <div className='text-center'>
        <Button variant="outline-danger" onClick={cancelOrder} style={{marginTop:'50px'}}>Cancel Order $ {totalPrice}</Button>
      </div>
      {/* <div className="cart-right w-25">
        <h1>Subtotal</h1>
        <hr />
        <div className="cart-right-details d-flex flex-column justify-content-center align-items-center">
          <h4>
            Total Price: <hr />${totalPrice}
          </h4>
          <div className="d-flex justify-content-evenly w-100">
            <button className="btn btn-primary" onClick={checkout}>
              <Link to={'/checkout'} style={{textDecoration:'none',color:'white'}} >Checkout</Link>
            </button>
            <button className="btn btn-danger" onClick={clearCart}>
              Clear Cart
            </button>
          </div>
        </div>
      </div> */}
    </div>
    
  )
}

export default OrderPage
