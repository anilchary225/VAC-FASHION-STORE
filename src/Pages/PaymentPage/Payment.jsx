import React from "react";
import axios from "axios";
import "./Payment.css";
import { useState, useEffect, useContext } from "react";
import { CartContext } from "../../Context/CartContext";
import { Link } from "react-router-dom";
import { Navigate,useParams } from "react-router-dom";

import emailjs from '@emailjs/browser';
import { EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, EMAILJS_PUBLIC_KEY } from '../../config/emailconfig';

function Payment() {
  const { storeProducts, totalPrice } = useContext(CartContext);
  const { id } = useParams();
  
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    paymentMethod: "",
    cardNumber: "",
    expirationDate: "",
    cvv: "",
    totalPrice: 0,
  });
  const [paymentMethod, setPaymentMethod] = useState("");
  const [product,setProduct] = useState(null);
  const [productPrice, setProductPrice] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function productDetails() {
      if(id) {
        try {
          let product = await axios.get(`https://dummyjson.com/products/${id}`);
          setProduct(product.data);
        }catch (error) {
          console.error('Error fetching product:', error);
        }
      }
    }
    productDetails()
  }, [id]);

  useEffect(() => {
    if (product) {
      console.log("Product Price:", product.price);
      setProductPrice(product.price);
    }
  }, [product]);

  // Email sending function with error handling
  const sendEmail = async (formData, totalPriceValue) => {
    // Check if EmailJS credentials are loaded
    const now = new Date();
    if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
      console.error("EmailJS credentials missing!");
      alert("Email configuration error. Please check your environment variables.");
      return false;
    }

    const buyProductId = localStorage.getItem("buyproductid");
    let cartQuantitiesRaw = localStorage.getItem("cartQuantities");
    let cartQuantities = {};
    
    try {
      if (cartQuantitiesRaw && cartQuantitiesRaw !== "undefined") {
        cartQuantities = JSON.parse(cartQuantitiesRaw);
      }
    } catch (e) {
      console.error("Failed to parse cartQuantities from localStorage", e);
    }
    
    const cartIds = Object.keys(cartQuantities);
    let selectedProducts = [];
    let productList = "";

    // Handle different product selection scenarios
    if (id && product) {
      // Case 1: URL param for one product
      productList = `${product.title} (x1) - $${product.price}`;
    } else if (cartIds.length > 0) {
      // ✅ Case 2: Multiple products in cart — handled first
      selectedProducts = storeProducts.filter((product) =>
        cartIds.includes(String(product.id))
      );
      productList = selectedProducts
        .map((product) => {
          const quantity = cartQuantities[String(product.id)] || 1;
          return `${product.title} (x${quantity}) - $${product.price * quantity}`;
        })
        .join("\n");
      localStorage.removeItem("buyproductid"); // Clear buyProductId if using cart
    } else if (buyProductId) {
      // Case 3: Buy now fallback
      selectedProducts = storeProducts.filter(
        (product) => String(product.id) === String(buyProductId)
      );
      if (selectedProducts.length > 0) {
        productList = `${selectedProducts[0].title} (x1) - $${selectedProducts[0].price}`;
      }
    }

    // EmailJS template parameters
    const templateParams = {
      user_name: formData.fullName,
      user_email: formData.email,
      user_phone: formData.phone,
      user_address: formData.address,
      user_city: formData.city,
      user_state: formData.state,
      user_zip: formData.zip,
      user_country: formData.country,
      payment_method: formData.paymentMethod,
      product_list: productList,
      total_price: totalPriceValue,
      to_email: formData.email,
      message: `Order confirmation for ${formData.fullName}`,
    };

    try {
      setIsLoading(true);
      
      const result = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
      );
      const currentTime = new Date().toLocaleTimeString();
      const currentDate = new Date().toLocaleDateString();
      const weekday = now.toLocaleDateString(undefined, { weekday: 'long' });
      localStorage.setItem("orderTime", currentTime);
      localStorage.setItem("orderDate", currentDate);
      localStorage.setItem("orderWeekday", weekday);

      console.log('Email sent successfully!', result);
      alert('✅ Confirmation email sent successfully!');
      return true;
      
    } catch (error) {
      console.error("EmailJS Error:", error);
      
      // Specific error handling
      if (error.status === 400) {
        alert("Email sending failed: Bad request. Please check your template parameters.");
      } else if (error.status === 401) {
        alert("Email sending failed: Unauthorized. Please check your EmailJS public key.");
      } else if (error.status === 404) {
        alert("Email sending failed: Service or template not found. Please check your IDs.");
      } else {
        alert(`Email sending failed: ${error.text || 'Unknown error'}`);
      }
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const updatedFormData = { 
      ...formData, 
      pricetosend: id ? productPrice : totalPrice 
    };

    // Send email first
    const emailSent = await sendEmail(updatedFormData, id ? productPrice : totalPrice);
    
    if (emailSent) {
      // Clear localStorage only after successful email
      localStorage.removeItem("buyproductid");
      localStorage.removeItem("isBuyNowClicked");
      
      alert("Payment processed successfully!");
      window.location.href = "/order-confirmation";
    } else {
      alert("Payment processed, but email confirmation failed. Please contact support.");
    }
  };

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn) {
      window.location.href = '/register';
    }
  }, []);

  return (
    <div className="payment-container" style={{ marginTop: "56px" }}>
      <div className="payment-box p-5 ">
        <h1 className="text-center mb-3" style={{ fontFamily: "copperplate" }}>
          Bill Information
        </h1>
        <h4 className="text-center mb-3" style={{ fontFamily: "copperplate" }}>
          Total Price: ${id ? productPrice : totalPrice}
        </h4>
        
        <div
          className="d-flex justify-content-center align-items-center flex-column"
          style={{ width: "95%", margin: "auto", height: "100%" }}
        >
          <form
            className="form-control d-flex flex-column justify-content-center align-items-center "
            style={{ width: "100%", height: "auto" }}
            onSubmit={handleSubmit}
          >
            <div className="d-flex  flex-column gap-3 w-100">
              <p className="m-0 p-0">Full Name</p>
              <input
                type="text"
                placeholder="Enter Your Full Name"
                className="form-control"
                value={formData.fullName}
                onChange={(e) =>
                  setFormData({ ...formData, fullName: e.target.value })
                }
                required
              />
              <p className="m-0 p-0">Email</p>
              <input
                type="email"
                placeholder="Enter Your Email"
                className="form-control"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
              />
              <p className="m-0 p-0">Phone Number</p>
              <input
                type="tel"
                placeholder="Enter Your Phone Number"
                className="form-control"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                required
              />
              <p className="m-0 p-0">Shipping Address</p>
              <input
                type="text"
                placeholder="Enter Your Address"
                className="form-control"
                value={formData.address}
                onChange={(e) =>
                  setFormData({ ...formData, address: e.target.value })
                }
                required
              />
              <p className="m-0 p-0">City</p>
              <input
                type="text"
                placeholder="Enter Your City"
                className="form-control"
                value={formData.city}
                onChange={(e) =>
                  setFormData({ ...formData, city: e.target.value })
                }
                required
              />
              <p className="m-0 p-0">State</p>
              <input
                type="text"
                placeholder="Enter Your State"
                className="form-control"
                value={formData.state}
                onChange={(e) =>
                  setFormData({ ...formData, state: e.target.value })
                }
                required
              />
              <p className="m-0 p-0">Zip Code</p>
              <input
                type="text"
                placeholder="Enter Your Zip Code"
                className="form-control"
                value={formData.zip}
                onChange={(e) =>
                  setFormData({ ...formData, zip: e.target.value })
                }
                required
              />
              <p className="m-0 p-0">Country</p>
              <input
                type="text"
                placeholder="Enter Your Country"
                className="form-control"
                value={formData.country}
                onChange={(e) =>
                  setFormData({ ...formData, country: e.target.value })
                }
                required
              />
              <p className="m-0 p-0">Payment Method</p>
              <select
                className="form-control"
                value={formData.paymentMethod}
                onChange={(e) => {
                  setPaymentMethod(e.target.value);
                  setFormData({ ...formData, paymentMethod: e.target.value });
                }}
                required
              >
                <option value="">-- Select Payment Method --</option>
                <option value="cash-on-delivery">Cash on Delivery</option>
                <option value="card">Credit/Debit Card</option>
              </select>

              {paymentMethod === "card" && (
                <>
                  <p className="m-0 p-0">Card Number</p>
                  <input
                    type="text"
                    placeholder="Enter Your Card Number"
                    className="form-control"
                    value={formData.cardNumber}
                    onChange={(e) =>
                      setFormData({ ...formData, cardNumber: e.target.value })
                    }
                    required
                  />

                  <p className="m-0 p-0">Expiration Date</p>
                  <input
                    type="date"
                    placeholder="MM/YY"
                    className="form-control"
                    value={formData.expirationDate}
                    onChange={(e) =>
                      setFormData({ ...formData, expirationDate: e.target.value })
                    }
                    required
                  />

                  <p className="m-0 p-0">CVV</p>
                  <input
                    type="text"
                    placeholder="Enter Your CVV"
                    className="form-control"
                    maxLength={4}
                    value={formData.cvv}
                    onChange={(e) =>
                      setFormData({ ...formData, cvv: e.target.value })
                    }
                    required
                  />
                </>
              )}

              <button 
                type="submit" 
                className="btn btn-primary mt-2 w-100"
                disabled={isLoading}
              >
                {isLoading ? "Processing..." : "Confirm & Pay"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Payment;