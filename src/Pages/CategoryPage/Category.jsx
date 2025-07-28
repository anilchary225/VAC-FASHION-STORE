import React from 'react'

import { useState,useEffect } from 'react';
import CategoryBlogcart from './CategoryBlogcart';
import ProductCarousel from '../../Components/Productcarousel/ProductCarousel';

import { useParams } from 'react-router-dom';
import axios from 'axios';

function Category() {

    const [categoryProducts, setCategoryProducts]=useState([])
    const {category} = useParams();
    // Fetch categories from the API
    useEffect(()=>{
        async function getProducts(){
            if(category){
          let categoryProducts=await axios.get(`https://dummyjson.com/products/category/${category}`)
            //let k=await axios.get('https://dummyjson.com/products') 
            // console.log(categoryProducts.data.products)
            setCategoryProducts(categoryProducts.data.products);
        //     console.log("Fetched products:", categoryProducts.data.products);
            
            }
            
        }
        getProducts()
        
    },[category])

    // const [isAddedToCart, setIsAddedToCart] = useState(false);
    
    //   const addtocart = () => {
    //     const existing = localStorage.getItem('categorynames');
    //     const categorynames = existing ? existing.split(',') : [];
    
    //     if (!categorynames.includes(categoryProducts.category)) {
    //       categorynames.push(categoryProducts.category);
    //       localStorage.setItem('categorynames', categorynames.join(','));
    //       setIsAddedToCart(true);
    //     }
    //   };
return (
    <div>
            <h1 className='text-center m-5'>{category} Products</h1>
            <div className='d-flex flex-wrap gap-3 justify-content-center align-items-center'>
                    {categoryProducts && categoryProducts.length > 0 ? (
                            categoryProducts.map(categoryProduct => {
                                    // console.log(categoryProduct);
                                    return <CategoryBlogcart key={categoryProduct.id} categoryProduct={categoryProduct} />;
                            })
                    ) : (
                            <p>No products available in this category.</p>
                    )}
            </div>
    </div>
);
}

export default Category
