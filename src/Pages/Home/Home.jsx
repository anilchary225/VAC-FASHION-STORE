import VacCarousel from '../../Components/Carousel/Carousel';
import CategoryCard from '../../Components/CategoryCard';
import './Home.css';
import React from 'react'
import axios from'axios';
import { useEffect,useState } from 'react';
import ProductCard from '../../Components/ProductCard/ProductCard';
function Home() {
    const [storeProducts, setStoreProducts]=useState([])
    const [categories, setCategories]=useState([])

    useEffect(()=>{
      async function getCategories(){
        let c=await axios.get('https://dummyjson.com/products/category-list')
        setCategories(c.data)
        // console.log(c.data)
      }
      getCategories()
    },[])
    // Fetch categories from the API
    useEffect(()=>{
        async function getProducts(){
          let k=await axios.get('https://dummyjson.com/products?limit=100')
            //let k=await axios.get('https://dummyjson.com/products') 
            // console.log(k.data.products)
            setStoreProducts(k.data.products)
        }
        getProducts()
        
    },[])

  return (
    <div>
      <VacCarousel/>
      <div className='d-flex justify-content-center align-items-center m-5 row-gap-3' style={{flexDirection:'column'}}>
        <h1>Category</h1>
        <div className='d-flex flex-wrap justify-content-center align-items-center gap-3'>
          {categories && categories.length>0 && categories.map(category=>{
            return <CategoryCard  category={category}/>
          })}
            {/* <CategoryCard filename={'beauty.png'} category={'beauty'}/>
            <CategoryCard filename={'Clothes.png'} category={'clothes'}/>
            <CategoryCard filename={'electronics.png'} category={'electronic'}/>
            <CategoryCard filename={'shoes.png'} category={'Shoes'}/>
            <CategoryCard filename={'furniture.png'} category={'furniture'}/>
            <CategoryCard filename={'food.png'} category={'food'}/>
            <CategoryCard filename={'food.png'} category={'smartphones'}/> */}
        </div>
      </div>
      <div>
        <h1 className='text-center'>Products</h1>
        <div className='d-flex flex-wrap gap-3 justify-content-center align-items-center'>
            {storeProducts && storeProducts.length>0 && storeProducts.map(product=>{
                return <ProductCard key={product.id} product={product}/>
            })}
        </div>
      </div>
    </div>
  )
}

export default Home
