import React, { createContext, useState, useEffect } from "react";
import axios from "axios";


export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartIds, setCartIds] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [quantities, setQuantities] = useState({});
  const [updateTrigger, setUpdateTrigger] = useState(0);
  const [storeProducts, setStoreProducts]=useState([])


  // Load cart IDs from localStorage on mount
  // useEffect(() => {
  //   const stored = localStorage.getItem("cartIds");
  //   if (stored && stored.trim() !== "") {
  //     const ids = stored.split(",").map(id => id.trim()).filter(Boolean);
  //     const storedQuantities = localStorage.getItem("cartQuantities");
  //     if (storedQuantities) {
  //       setQuantities(JSON.parse(storedQuantities));
  //     }
  //     setCartIds(ids);
  //   } else {
  //     setCartIds([]);
  //   }
  // }, []);





  useEffect(()=>{
    async function getProducts(){
      let k=await axios.get('https://dummyjson.com/products?limit=100')
        //let k=await axios.get('https://dummyjson.com/products') 
        // console.log(k.data.products)
        setStoreProducts(k.data.products)
    }
    getProducts()
    
},[])

  useEffect(() => {
    const stored = localStorage.getItem("cartIds");
    const storedQuantities = localStorage.getItem("cartQuantities");
  
    if (stored && stored.trim() !== "") {
      const ids = stored.split(",").map(id => id.trim()).filter(Boolean);
      setCartIds(ids);
    }
  
    if (storedQuantities) {
      setQuantities(JSON.parse(storedQuantities));
    }
  }, []);



  

  // Fetch cart items when cartIds change
  useEffect(() => {
    if (cartIds.length > 0) {
      Promise.all(
        cartIds.map(id =>
          axios.get(`https://dummyjson.com/products/${id}`).then(res => res.data)
        )
      ).then(products => {
        setCartItems(products);
        // Restore or initialize quantities for fetched products
        setQuantities(prevQuantities => {
          const updatedQuantities = { ...prevQuantities };
          products.forEach(product => {
            const productIdStr = String(product.id);
            // Only set default quantity if it doesn't exist
            if (!updatedQuantities.hasOwnProperty(productIdStr)) {
              updatedQuantities[productIdStr] = 1;
            }
          });
          return updatedQuantities;
        });
      }).catch(err => {
        console.error("Error fetching cart items:", err);
      });
    } else {
      setCartItems([]);
      
    }
  }, [cartIds]);

  // Calculate total price when cart items or quantities change
  useEffect(() => {
    if (cartItems.length > 0) {
      const total = cartItems.reduce((sum, item) => {
        const quantity = quantities[item.id] || 1;
        return sum + (item.price * quantity);
      }, 0);
      setTotalPrice(total);
    } else {
      setTotalPrice(0);
    }
  }, [cartItems, quantities]);

  // Add item to cart
  const addToCart = (productId) => {
    const productIdStr = String(productId);
    if (!cartIds.includes(productIdStr)) {
      const newCartIds = [...cartIds, productIdStr];
      setCartIds(newCartIds);
      localStorage.setItem("cartIds", newCartIds.join(","));
      setUpdateTrigger(prev => prev + 1);
    }
  };

  // Remove item from cart
  // const removeFromCart = (productId) => {
  //   const productIdStr = productId.toString();
  //   const newCartIds = cartIds.filter(id => id !== productIdStr);
  //   setCartIds(newCartIds);
    
  //   // Update localStorage
  //   if (newCartIds.length > 0) {
  //     localStorage.setItem("cartIds", newCartIds.join(","));
  //   } else {
  //     localStorage.removeItem("cartIds");
  //   }

  const removeFromCart = (productId) => {
  const productIdStr = String(productId);
  const newCartIds = cartIds.filter(id => id !== productIdStr);
  setCartIds(newCartIds);

  if (newCartIds.length > 0) {
    localStorage.setItem("cartIds", newCartIds.join(","));
  } else {
    localStorage.removeItem("cartIds");
  }

  const newQuantities = { ...quantities };
  delete newQuantities[productIdStr];
  setQuantities(newQuantities);
  localStorage.setItem("cartQuantities", JSON.stringify(newQuantities));

  setUpdateTrigger(prev => prev + 1);
};
    
    // Remove quantity for this item
  //   const newQuantities = { ...quantities };
  //   delete newQuantities[productId];
  //   setQuantities(newQuantities);
    
  //   // Force re-render
  //   setUpdateTrigger(prev => prev + 1);
  // };

  // Update quantity
  const updateQuantity = (productId, quantity) => {
    if (quantity >= 1) {
      const newQuantities = {
        ...quantities,
        [String(productId)]: quantity
      };
      
      setQuantities(newQuantities);
      localStorage.setItem("cartQuantities", JSON.stringify(newQuantities));
    }
  };

  // Clear entire cart
  const clearCart = () => {
    setCartIds([]);
    setCartItems([]);
    setQuantities({});
    setTotalPrice(0);
    localStorage.removeItem("cartIds");
    localStorage.removeItem("cartQuantities");
    setUpdateTrigger(prev => prev + 1);
  };

  // Check if item is in cart
  const isInCart = (productId) => {
    return cartIds.includes(productId.toString());
  };
  

  return (
    <CartContext.Provider value={{
      cartIds,
      cartItems,
      totalPrice,
      quantities,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      isInCart,
      setCartIds,
      setTotalPrice,
      storeProducts,
      updateTrigger
    }}>
      {children}
    </CartContext.Provider>
  );
};