import "./Cart.css";
import React, {  useContext,useState } from "react";

import { Link, useNavigate } from "react-router-dom";


import { CartContext } from "../../Context/CartContext";
function Cart() {
  
  const {
    cartItems,
    totalPrice,
    quantities,
    updateQuantity,
    removeFromCart,
    clearCart
  } = useContext(CartContext);
  const navigate = useNavigate();
  const checkout = () => {
    alert("Proceeding to checkout!");
    navigate('/checkout')
    // Add your checkout logic here
  };

  const incrementQuantity = (id) => {
    const currentQuantity = quantities[id] || 1;
    
    updateQuantity(id, currentQuantity + 1);
  };

  const decrementQuantity = (id) => {
    const currentQuantity = quantities[id] || 1;
    if (currentQuantity > 1) {
      updateQuantity(id, currentQuantity - 1);
    }
  };
 

  return (
    <div className="cart-container d-flex" style={{ marginTop: "57px",paddingBottom: "100px" }}>
      <div className="cart-left w-75">
        <h1 className="text-center">Shopping Cart</h1>
        <hr />
        {cartItems.length > 0 ? (
          <p className="text-center">Selected Products</p>
        ) : (
          <p className="text-center">There are no products in cart</p>
        )}
        <div className="carts w-90">
          {cartItems &&
            cartItems.length > 0 &&
            cartItems.map((cart) => {
              const quantity = quantities[cart.id] || 1;
              return (
                <div key={cart.id} className="cart d-flex w-100">
                  <div className="cart-img w-25">
                    <img src={cart.thumbnail} width="200px" alt={cart.title} />
                  </div>
                  <div className="cart-details d-flex justify-content-center flex-column w-50 py-3">
                    <h1>{cart.title}</h1>
                    <p>{cart.description}</p>
                    <p>
                      Rating: {cart.rating}{" "}
                      <img
                        src="rating.png"
                        width={"20px"}
                        height={"20px"}
                        style={{ marginLeft: "4px", padding: "0" }}
                        alt="rating"
                      />
                    </p>
                    <p>
                      Quantity:
                      <span>
                        <button
                          onClick={() => decrementQuantity(cart.id)}
                          className="p-0 m-0"
                          style={{
                            width: "25px",
                            height: "25px",
                            borderRadius: "8px",
                          }}
                        >
                          {" "}
                          -{" "}
                        </button>
                        {quantity}
                        <button
                          onClick={() => incrementQuantity(cart.id)}
                          style={{
                            width: "25px",
                            height: "25px",
                            borderRadius: "8px",
                          }}
                        >
                          {" "}
                          +{" "}
                        </button>
                      </span>
                    </p>
                  </div>
                  <div className="cart-price d-flex flex-column w-25 p-3">
                    <h2 className="price-header">Price: $ {cart.price}</h2>
                    <h3>Subtotal: $ {(cart.price * quantity).toFixed(2)}</h3>
                    <button
                      className="btn btn-danger w-100"
                      onClick={() => removeFromCart(cart.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
      <div className="cart-right w-25">
        <h1>Subtotal</h1>
        <hr />
        <div className="cart-right-details d-flex flex-column justify-content-center align-items-center">
          <h4>
            Total Price: <hr />${totalPrice.toFixed(2)}
          </h4>
          <div className="d-flex justify-content-evenly w-100">
            <button className="btn btn-primary" onClick={checkout}>
              
                Checkout
              
            </button>
            <button className="btn btn-danger" onClick={clearCart}>
              Clear Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Cart;