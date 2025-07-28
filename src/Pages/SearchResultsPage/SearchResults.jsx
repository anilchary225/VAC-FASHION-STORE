// import React from 'react';
// import ProductCard from '../CategoryPage/CategoryBlogcart';
// import { useLocation } from 'react-router-dom';

// const SearchResults=()=> {
//   const location = useLocation();
//   const searchResults = location.state?.searchResults || [];

//   return (
//     <div className='' style={{ marginTop: '100px' }}>
//       <h1 className='text-center'>Products</h1>
//       <div className='d-flex flex-wrap gap-3 justify-content-center align-items-center'>
//         {searchResults.length > 0 ? (
//           searchResults.map(product => (
//             <ProductCard key={product.id} product={product} />
//           ))
//         ) : (
//           <p className="text-center">No products found.</p>
//         )}
//       </div>
//     </div>
//   );
// }


import { useLocation } from 'react-router-dom';
import ProductCard from '../../Components/ProductCard/ProductCard';

const SearchResults = () => {
  const location = useLocation();
  const searchResults = location.state?.searchResults || [];

  return (
    <div className='' style={{ marginTop: '57px' }}>
        
       <h1 className='text-center m-5'>{searchResults.length!==0 ? "Products" : "No products are found"}</h1>
       <div className='d-flex flex-wrap gap-3 justify-content-center align-items-center'>
      {searchResults.length>0 && searchResults.map(product => (
        <ProductCard key={product.id} product={product}/>
        // <div key={product.id}>{product.title}</div>
      ))}
    </div>
    </div>
  );
};
export default SearchResults;