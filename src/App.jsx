import './App.css'
import StoreNavbar from './Components/Navbar/Navbar'
import Cart from './Pages/CartPage/Cart'
import Home from './Pages/Home/Home'
import Product from './Pages/Product/Product'
import { Routes,Route } from 'react-router-dom'
import Category from './Pages/CategoryPage/Category'
import Login from './Pages/LoginPage/Login'
import Register from './Pages/RegisterPage/Register'
import Payment from './Pages/PaymentPage/Payment'
import OrderPage from './Pages/OrderPage/OrderPage'
import Profile from './Pages/ProfilePage/Profile'
import SearchResults from './Pages/SearchResultsPage/SearchResults'


function App() {


  return (
    <div style={{overflow:'hidden'}}>
      <StoreNavbar/>


    <Routes>
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Register/>} />
        
        <Route path='/' element={<Home/>}/>
        <Route path='/search-results' element={<SearchResults/>}/>
        <Route path='/profile' element={<Profile/>} />
        <Route path='/Product/:id' element={<Product/>}/>
        <Route path='/Mycart' element={<Cart/>}/>
        <Route path='/checkout' element={<Payment/>}/>
        <Route path='/checkout/:id' element={<Payment/>}/>
        <Route path='/order-confirmation' element={<OrderPage/>} />
        <Route path='/category/:category' element={<Category/>} />
      
    </Routes>
    </div>
  )
}

export default App
